import { Box, Text, Button, useDisclosure, Menu } from "@chakra-ui/react";
import MyChatsList from "./MyChatsList";
import { ChatContext } from "../../store/context/chatContext";
import { useContext } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";

const ChatBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, userDetails } = useContext(ChatContext);
  const chatName: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].name
      : selectedChat.participants[0].name
    : "";
  const chatEmail: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].email
      : selectedChat.participants[0].email
    : "";
  const chatProfilePicture: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].profilePicture
      : selectedChat.participants[0].profilePicture
    : "";

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100vw"} h={"90vh"}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} w={"90%"} h={"90%"} textColor={"black"} bgColor={"transparent"}>
          <Box w={{ base: "100%", md: "40%", lg: "30%" }} bgColor={"white"} rounded={"15px"}>
            <MyChatsList />
          </Box>
          {/* message box */}
          <Box
            w={{ lg: "70%", md: "60%" }}
            bgColor={"white"}
            ml={"10px"}
            rounded={"15px"}
            background={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/chat_bg.webp')"}
            display={{ base: "none", md: "flex" }}
            flexDirection={"column"}
            backgroundSize={"cover"}
            className="bg-no-repeat bg-center"
          >
            <Box display={"flex"} justifyContent={"space-between"} p={"10px"} bgColor={"white"} h={"15%"} w={"100%"} roundedTopLeft={"15px"} roundedTopRight={"15px"}>
              <Text fontSize={"x-large"} fontWeight={"400"}>
                {chatName}
              </Text>
              {selectedChat && !selectedChat.isGroupChat && (
                <Menu>
                  <Button display={"flex"} justifyContent={"space-between"} alignItems={"center"} onClick={onOpen}>
                    <ViewIcon />
                  </Button>
                  <ProfileModal isOpen={isOpen} onClose={onClose} isForOtherUser={true} userName={chatName} userEmail={chatEmail} profilePicture={chatProfilePicture} />
                </Menu>
              )}
            </Box>
            <Box overflowX={"hidden"} overflowY={"auto"} textColor={"white"}>
              <Box p={"10px"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ratione deserunt assumenda veritatis, vero totam voluptate ipsa ipsum quos voluptates, expedita consequuntur facilis
                perferendis maiores amet porro cum iusto est. Nihil provident quas aliquid excepturi exercitationem ex sint, perferendis odio atque placeat a perspiciatis delectus doloribus eos rerum
                repellat, laborum inventore. Officiis, suscipit? Facilis illo nesciunt reprehenderit esse sapiente a! Voluptates unde commodi reiciendis provident consectetur animi vel quidem neque.
                Eius culpa, fugit quia id aliquid officiis autem maxime aliquam ullam, enim repellat modi. Eligendi nam quae quis perspiciatis natus? Aut fugiat minima unde, mollitia, ad odit
                similique obcaecati eveniet repellat quam totam architecto reiciendis esse explicabo asperiores quod harum consectetur! Nam molestiae nisi vero tempore totam animi esse repudiandae!
                Error vel consequuntur quam nostrum fugiat beatae. Atque ipsam repellendus architecto beatae laudantium, minus, dolores, quas illum corporis sed sapiente consequuntur assumenda dolorem
                obcaecati pariatur eligendi! At ipsum maiores nam? Reiciendis, doloremque odit nisi magnam asperiores neque rem ullam et tempore, eaque fugiat? Quod iure quam ullam, perferendis
                placeat laborum a tenetur, dolores atque molestias harum repellat at pariatur itaque. Expedita eveniet saepe sit debitis nesciunt, non odio, fugiat unde temporibus iure deleniti id
                consequatur nisi maiores incidunt suscipit exercitationem commodi beatae dolorem enim laborum vitae reiciendis qui. Nesciunt, eveniet? Quas vitae iure molestiae sunt provident in nulla
                culpa rem consequatur, numquam sit dicta voluptatem omnis voluptates nihil. Quidem repellendus consectetur possimus sed facilis eius cum facere iste delectus rerum? Sunt ad fuga error
                delectus nihil asperiores inventore est excepturi quidem reiciendis distinctio tenetur ipsa suscipit perspiciatis voluptates corporis ullam deserunt porro numquam similique, voluptatem
                totam! Enim doloremque soluta quos. Dicta culpa corporis tenetur harum excepturi odio. Assumenda ullam vel, quo quasi maxime hic quidem obcaecati repudiandae quod placeat similique
                possimus quos ea, impedit dicta quaerat, voluptas nisi! Necessitatibus, assumenda. Harum aut magnam atque fugiat eius iusto unde rem dolorem itaque voluptates? Magni hic tempora
                officia unde, doloremque vel ab impedit debitis dignissimos ad porro exercitationem sint nam odit ut. Error laborum saepe iste. Eius voluptas debitis optio adipisci esse. Alias libero,
                blanditiis nulla earum voluptas iure exercitationem enim quos, vero repellendus ducimus ad reprehenderit quis quisquam fugiat dolore ipsa! Officiis accusantium molestiae earum quis,
                voluptas nam corrupti reiciendis officia, natus modi quam deleniti, enim est? Quibusdam doloribus officia esse tenetur doloremque, hic architecto quo dolorem provident cupiditate
                dolorum debitis? Sunt in quasi neque eius ducimus natus id dolores quos deserunt laboriosam dolorum a ullam molestiae corporis aspernatur suscipit eligendi deleniti ut animi sequi
                officia, saepe quae. Deleniti, tempore? Cum! Inventore, eos? Blanditiis accusantium optio rem recusandae? Nisi eaque fugiat saepe consectetur? Doloribus praesentium nisi suscipit odio
                ex error dicta porro at consequatur commodi, id, amet unde similique nobis delectus. Repellat veritatis iusto minima ipsa nostrum omnis dignissimos eligendi magni maiores illum placeat
                inventore autem magnam aspernatur sed molestiae, tenetur reiciendis qui at, cumque commodi! Distinctio illum at officia aut. Aspernatur, saepe! Quos reiciendis obcaecati molestiae
                assumenda unde dicta et id, aliquid, voluptate odio eius fugiat totam facilis esse repudiandae vitae incidunt, odit similique dolorum ipsum rerum temporibus saepe doloremque? Quis quod
                praesentium tenetur nisi. Maxime et voluptas doloribus iure eligendi! Quibusdam enim quidem quisquam ea, facere, illo qui sit voluptatem perferendis iusto corporis recusandae iste
                optio exercitationem voluptate inventore! Velit consectetur, nisi distinctio facere esse tempora corporis, voluptatem amet ipsam quo provident doloremque similique magnam iste ducimus
                perferendis doloribus illo dolorem! Omnis doloremque officiis voluptatibus illum nemo adipisci ipsum? Minus debitis maxime dignissimos, eum quos numquam error ab sed modi nulla dolor,
                vero laudantium soluta sequi, amet enim ducimus quam esse doloremque et ad minima. Enim rem autem optio. uidem reiciendis distinctio tenetur ipsa suscipit perspiciatis voluptates
                corporis ullam deserunt porro numquam similique, voluptatem totam! Enim doloremque soluta quos. Dicta culpa corporis tenetur harum excepturi odio. Assumenda ullam vel, quo quasi maxime
                hic quidem obcaecati repudiandae quod placeat similique possimus quos ea, impedit dicta quaerat, voluptas nisi! Necessitatibus, assumenda. Harum aut magnam atque fugiat eius iusto unde
                rem dolorem itaque voluptates? Magni hic tempora officia unde, doloremque vel ab impedit debitis dignissimos ad porro exercitationem sint nam odit ut. Error laborum saepe iste. Eius
                voluptas debitis optio adipisci esse. Alias libero, blanditiis nulla earum voluptas iure exercitationem enim quos, vero repellendus ducimus ad reprehenderit quis quisquam fugiat dolore
                ipsa! Officiis accusantium molestiae earum quis, voluptas nam corrupti reiciendis officia, natus modi quam deleniti, enim est? Quibusdam doloribus officia esse tenetur doloremque, hic
                architecto quo dolorem provident cupiditate dolorum debitis? Sunt in quasi neque eius ducimus natus id dolores quos deserunt laboriosam dolorum a ullam molestiae corporis aspernatur
                suscipit eligendi deleniti ut animi sequi officia, saepe quae. Deleniti, tempore? Cum! Inventore, eos? Blanditiis accusantium optio rem recusandae? Nisi eaque fugiat saepe consectetur?
                Doloribus praesentium nisi suscipit odio ex error dicta porro at consequatur commodi, id, amet unde similique nobis delectus. Repellat veritatis iusto minima ipsa nostrum omnis
                dignissimos eligendi magni maiores illum placeat inventore autem magnam aspernatur sed molestiae, tenetur reiciendis qui at, cumque commodi! Distinctio illum at officia aut.
                Aspernatur, saepe! Quos reiciendis obcaecati molestiae assumenda unde dicta et id, aliquid, voluptate odio eius fugiat totam facilis esse repudiandae vitae incidunt, odit similique
                dolorum ipsum rerum temporibus saepe doloremque? Quis quod praesentium tenetur nisi. Maxime et voluptas doloribus iure eligendi! Quibusdam enim quidem quisquam ea, facere, illo qui sit
                voluptatem perferendis iusto corporis recusandae iste optio exercitationem voluptate inventore! Velit consectetur, nisi distinctio facere esse tempora corporis, voluptatem amet ipsam
                quo provident doloremque similique magnam iste ducimus perferendis doloribus illo dolorem! Omnis doloremque officiis voluptatibus illum nemo adipisci ipsum? Minus debitis maxime
                dignissimos, eum quos numquam error ab sed modi nulla dolor, vero laudantium soluta sequi, amet enim ducimus quam esse doloremque et ad minima. Enim rem autem optio.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ChatBox;
