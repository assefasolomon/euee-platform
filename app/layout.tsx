import "./globals.css";

export const metadata = {
  title: "EUEE Prep - Learn for the Entrance Exam",
  description: "Project-based, self-paced prep for the Ethiopian University Entrance Examination.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
