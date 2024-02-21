import { Box, Flex, Button, Link, Heading } from "@chakra-ui/react";
import { useAuth } from "../../contexts/Auth";

const Navbar = () => {
  const {
    state: { user },
  } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.300"
      color="white"
    >
      <Box bg={"#fff"} borderRadius={"100px"} p="4px" overflow={"hidden"}>
        <img src="/muscle.png" alt="Logo" width="40" height="40" />
      </Box>
      <Heading as="h1" p="4px">
        Your Gym Manager
      </Heading>

      {!user?.loggedIn && (
        <Button colorScheme="whiteAlpha">
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
