export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-green-500 p-4 text-white text-center font-semibold"
      style={{
        backgroundImage: 'url("/logo_v2.svg")',
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto",
        backgroundPosition: "center",
      }}
    >
      <p>
        © {currentYear} Fresco Foods Wholesale Grocers, S. L. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};
