// export async function generateStaticParams() {
//   return [
//     { id: "revolution-scoop-bra" },
//     { id: "leakproof-ultrathin-no-show-bikini" },
//     { id: "revolution-v-neck-bra" },
//     { id: "sculptrib-cotton-tank" },
//   ];
// }

export async function generateStaticParams() {
  return [
    { id: "leakproof-classic-one-piece-swimsuit" },
    { id: "ruched-deep-v-bikini-top" },
    { id: "sculpt-wrap-one-piece-swimsuit" },
    { id: "sculpt-ruched-bikini-top" },
  ];
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
