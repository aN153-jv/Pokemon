import "./globals.css";

export const metadata = {
  title: "Pokemon Game",
  description: "Jeu style Pokémon"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
