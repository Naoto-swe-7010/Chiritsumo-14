import { redirect } from "next/navigation";

const page = async () => {
  redirect("/logManagement/logTable/1");
};

export default page;
