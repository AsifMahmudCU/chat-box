import ChatBox from "@/components/chat/ChatBox";
import bn from "@/jsons/lang/bn.json";
import en from "@/jsons/lang/en.json";

export const metadata = {
  title: "Lets talk",
  description: "Author: Afreed Bin Haque & Asif Mahmud",
};

export default function Chat({ params }) {
  const { id } = params;

  let langData;
  if (id === "bn") {
    langData = bn;
  } else if (id === "en") {
    langData = en;
  } else {
    langData = en;
  }

  return <ChatBox langData={langData} />;
}
