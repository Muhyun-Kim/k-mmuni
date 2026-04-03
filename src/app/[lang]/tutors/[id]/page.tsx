export default async function TutorDetailPage({ params }: PageProps<"/[lang]/tutors/[id]">) {
  const { id } = await params;

  return (
    <div>
      <h1>Tutor {id}</h1>
    </div>
  );
}
