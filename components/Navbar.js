import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";
// import { ReactComponent as MySvg } from "../public/logo.svg";

import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";

const colors = {
  darkGreen: "#3F8B5E",
  mossGreen: "#9CD49A",
  blue: "#4878A7",
  lightBlue: "#6b94be",
}

export default function NavBar() {
  const wallet = useWallet();

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(26, 32, 44, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
            <Heading
              textAlign="left"
              fontFamily={"heading"}
              color={useColorModeValue("teal.800", "white")}
              as="h2"
              size="lg"
              w="full"
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <img src="/image2vector.svg" style={{ height: "2.2rem" }} alt="Trellis" />
                <Box
                  as={"span"}
                  color={useColorModeValue(colors.darkGreen, colors.mossGreen)}
                  position={"relative"}
                  zIndex={10}
                  _after={{
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    w: "full",
                    h: "30%",
                    bg: useColorModeValue("green.100", "green.900"),
                    zIndex: -1,
                  }}
                >

                  <NextLink href="/" >
                    <>
                      Trellis
                      {/* <Icon name="icon" /> */}
                    </>
                  </NextLink>
                </Box>

              </div>
            </Heading>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            display={{ base: "none", md: "flex" }}
          >
            <Button
              fontSize={"md"}
              fontWeight={600}
              variant={"link"}
              display={{ base: "none", md: "inline-flex" }}
            >
              <NextLink href="/campaign/new">Create Campaign</NextLink>
            </Button>
            <Button
              fontSize={"md"}
              fontWeight={600}
              variant={"link"}
              display={{ base: "none", md: "inline-flex" }}
            >
              <NextLink href="/#howitworks"> How it Works</NextLink>
            </Button>

            {wallet.status === "connected" ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {wallet.account.substr(0, 10) + "..."}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => wallet.reset()}>
                    {" "}
                    Disconnect Wallet{" "}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"#3F7B5E"}
                  href={"#"}
                  _hover={{
                    bg: "#9CD49A",
                  }}
                  onClick={() => wallet.connect()}
                >
                  Connect Wallet{" "}
                </Button>
              </div>
            )}

            <DarkModeSwitch />
          </Stack>

          <Flex display={{ base: "flex", md: "none" }}>
            <DarkModeSwitch />
          </Flex>
        </Container>
      </Flex >
    </Box >
  );
}
