import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button, IconButton, Textarea } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope, FaThumbsUp, FaComment } from "react-icons/fa";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [activities, setActivities] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);

  useEffect(() => {
    // Fetch posts, activities, and job recommendations from the server
    const fetchData = async () => {
      try {
        const postsResponse = await fetch("/api/posts");
        const activitiesResponse = await fetch("/api/activities");
        const jobRecommendationsResponse = await fetch("/api/job-recommendations");

        const postsData = await postsResponse.json();
        const activitiesData = await activitiesResponse.json();
        const jobRecommendationsData = await jobRecommendationsResponse.json();

        setPosts(postsData);
        setActivities(activitiesData);
        setJobRecommendations(jobRecommendationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPost }),
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts([newPostData, ...posts]);
        setNewPost("");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
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
              <Textarea
                placeholder="Share an update..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
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
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Text fontSize="xl" mb={4}>Feed</Text>
              {posts.map((post) => (
                <Box key={post.id} p={4} bg="gray.50" borderRadius="md" mb={2}>
                  <Text>{post.content}</Text>
                  <HStack spacing={4} mt={2}>
                    <Button leftIcon={<FaThumbsUp />} variant="ghost">Like</Button>
                    <Button leftIcon={<FaComment />} variant="ghost">Comment</Button>
                  </HStack>
                </Box>
              ))}
            </Box>
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