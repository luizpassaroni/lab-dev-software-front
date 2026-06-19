import { TitleDetail } from "@/modules/titles/components/TitleDetail";

export default async function TitlePage({
  params,
}: PageProps<"/titulo/[type]/[id]">) {
  const { type, id } = await params;

  return <TitleDetail type={type} id={id} />;
}
