import { Box, Flex, VStack, HStack, Text, Input, Avatar, Button, IconButton, Textarea } from "@chakra-ui/react";
import { FaSearch, FaHome, FaUser, FaBriefcase, FaEnvelope, FaThumbsUp, FaComment } from "react-icons/fa";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch job recommendations based on user profile, interests, and activity
    fetchJobRecommendations();
    // Fetch recent activities
    fetchActivities();
    // Fetch posts
    fetchPosts();
  }, []);

  const fetchJobRecommendations = async () => {
    // Replace with actual API call
    const recommendations = [
      { id: 1, title: "Software Engineer", company: "Tech Corp", location: "New York" },
      { id: 2, title: "Product Manager", company: "Business Inc.", location: "San Francisco" },
    ];
    setJobRecommendations(recommendations);
  };

  const fetchActivities = async () => {
    // Replace with actual API call
    const recentActivities = [
      { id: 1, activity: "New job posting: Frontend Developer at Web Solutions" },
      { id: 2, activity: "Your application for Backend Developer at CodeWorks has been viewed" },
    ];
    setActivities(recentActivities);
  };

  const fetchPosts = async () => {
    // Replace with actual API call
    const fetchedPosts = [
      { id: 1, user: "John Doe", content: "Excited to start my new job at Tech Corp!", likes: 10, comments: 2 },
      { id: 2, user: "Jane Smith", content: "Check out this great article on web development.", likes: 5, comments: 1 },
    ];
    setPosts(fetchedPosts);
  };

  const handlePost = () => {
    if (newPost.trim() === "") return;

    const post = {
      id: posts.length + 1,
      user: "Current User",
      content: newPost,
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
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
          <VStack spacing={4} align="start">
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Textarea
                placeholder="Share an update..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button mt={2} colorScheme="blue" onClick={handlePost}>Post</Button>
            </Box>
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Text fontSize="xl" mb={4}>Job Recommendations</Text>
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
                  <Text>{activity.activity}</Text>
                </Box>
              ))}
            </Box>
            <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
              <Text fontSize="xl" mb={4}>Posts</Text>
              {posts.map((post) => (
                <Box key={post.id} p={4} bg="gray.50" borderRadius="md" mb={2}>
                  <Text fontWeight="bold">{post.user}</Text>
                  <Text>{post.content}</Text>
                  <HStack spacing={4} mt={2}>
                    <Button leftIcon={<FaThumbsUp />} variant="ghost">{post.likes} Likes</Button>
                    <Button leftIcon={<FaComment />} variant="ghost">{post.comments} Comments</Button>
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