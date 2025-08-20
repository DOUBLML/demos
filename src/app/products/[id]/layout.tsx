export async function generateStaticParams() {
  return [
    { id: "revolution-scoop-bra" },
    { id: "leakproof-ultrathin-no-show-bikini" },
    { id: "revolution-v-neck-bra" },
    { id: "sculptrib-cotton-tank" },
  ];
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
