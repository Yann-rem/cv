import { notFound } from "next/navigation";

const CatchAllPage = () => {
  console.debug("[Render] 'CatchAllPage' Component");

  notFound();
};

export default CatchAllPage;
