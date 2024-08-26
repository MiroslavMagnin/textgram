import "./Footer.css";

export default function Footer() {
  return (
    <>
      <footer>
        <p>Textgram - is the social network with only text information</p>
        <p>© {new Date().getFullYear()} Miroslav Magnin</p>
      </footer>
    </>
  );
}
