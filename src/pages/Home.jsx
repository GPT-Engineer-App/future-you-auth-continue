import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button, IconButton, Textarea } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope, FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";
import RichTextEditor from "react-rte";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(RichTextEditor.createEmptyValue());
  const [activities, setActivities] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState({});
  const [userInterests, setUserInterests] = useState([]);
  const [activityHistory, setActivityHistory] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch initial data from the server
    const fetchData = async () => {
      try {
        const [postsResponse, activitiesResponse, jobRecommendationsResponse, preferencesResponse, interestsResponse, historyResponse] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/activities"),
          fetch("/api/job-recommendations"),
          fetch("/api/user/preferences"),
          fetch("/api/user/interests"),
          fetch("/api/user/activity-history")
        ]);

        const [postsData, activitiesData, jobRecommendationsData, preferencesData, interestsData, historyData] = await Promise.all([
          postsResponse.json(),
          activitiesResponse.json(),
          jobRecommendationsResponse.json(),
          preferencesResponse.json(),
          interestsResponse.json(),
          historyResponse.json()
        ]);

        setPosts(postsData);
        setActivities(activitiesData);
        setJobRecommendations(jobRecommendationsData);
        setUserPreferences(preferencesData);
        setUserInterests(interestsData);
        setActivityHistory(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Setup WebSocket connection for real-time updates
    const socket = io();
    socket.on("newPost", (post) => setPosts((prevPosts) => [post, ...prevPosts]));
    socket.on("notification", (notification) => setNotifications((prevNotifications) => [notification, ...prevNotifications]));

    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePostSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPost.toString("html") }),
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts([newPostData, ...posts]);
        setNewPost(RichTextEditor.createEmptyValue());
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchMorePosts = async () => {
    try {
      const response = await fetch(`/api/posts?offset=${posts.length}`);
      const morePosts = await response.json();
      if (morePosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...morePosts]);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
          )
        );
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShare = async (postId) => {
    try {
      await fetch(`/api/posts/${postId}/share`, { method: "POST" });
      // Optionally update the UI to reflect the share action
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <Box bg="blue.500" p={4} color="white">
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold">MyApp</Text>
          <HStack spacing={4}>
            <Input placeholder="Search" bg="white" color="black" />
            <IconButton aria-label="Search" icon={<FaSearch />} />
            <Avatar name="User Name" />
          </HStack>
        </Flex>
      </Box>
      <Flex flex="1">
        <Box w="20%" bg="gray.100" p={4}>
          <VStack align="start" spacing={4}>
            <Button leftIcon={<FaHome />} variant="ghost" justifyContent="flex-start" width="100%">Home</Button>
            <Button leftIcon={<FaUser />} variant="ghost" justifyContent="flex-start" width="100%">Profile</Button>
            <Button leftIcon={<FaBriefcase />} variant="ghost" justifyContent="flex-start" width="100%">Jobs</Button>
            <Button leftIcon={<FaEnvelope />} variant="ghost" justifyContent="flex-start" width="100%">Messages</Button>
          </VStack>
        </Box>
        <Box flex="1" p={4}>
          <VStack spacing={4}>
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <RichTextEditor
                value={newPost}
                onChange={setNewPost}
                placeholder="Share an update..."
              />
              <Button mt={2} colorScheme="blue" onClick={handlePostSubmit}>Post</Button>
            </Box>
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Text fontSize="xl" mb={4}>Personalized Job Recommendations</Text>
              {jobRecommendations.map((job) => (
                <Box key={job.id} p={4} bg="gray.50" borderRadius="md" mb={2}>
                  <Text fontWeight="bold">{job.title}</Text>
                  <Text>{job.company}</Text>
                  <Text>{job.location}</Text>
                </Box>
              ))}
            </Box>
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Text fontSize="xl" mb={4}>Recent Activities</Text>
              {activities.map((activity) => (
                <Box key={activity.id} p={4} bg="gray.50" borderRadius="md" mb={2}>
                  <Text>{activity.description}</Text>
                </Box>
              ))}
            </Box>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMorePosts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
            >
              <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
                <Text fontSize="xl" mb={4}>Feed</Text>
                {posts.map((post) => (
                  <Box key={post.id} p={4} bg="gray.50" borderRadius="md" mb={2}>
                    <Text dangerouslySetInnerHTML={{ __html: post.content }} />
                    <HStack spacing={4} mt={2}>
                      <Button leftIcon={<FaThumbsUp />} variant="ghost" onClick={() => handleLike(post.id)}>Like</Button>
                      <Button leftIcon={<FaComment />} variant="ghost" onClick={() => handleComment(post.id)}>Comment</Button>
                      <Button leftIcon={<FaShare />} variant="ghost" onClick={() => handleShare(post.id)}>Share</Button>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </InfiniteScroll>
          </VStack>
        </Box>
      </Flex>
      <Box bg="gray.200" p={4} textAlign="center">
        <Text>&copy; 2023 MyApp. All rights reserved.</Text>
      </Box>
    </Flex>
  );
};

export default Home;