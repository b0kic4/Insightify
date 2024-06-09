export default function Slug({ params }: { params: { id: string } }) {
  return <div>Slug + {params.id}</div>;
}
