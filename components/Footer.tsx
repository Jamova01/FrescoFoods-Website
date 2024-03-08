export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#A8D42E] p-4 text-white text-center font-semibold">
      <p>
        © {currentYear} Fresco Foods Wholesale Grocers, S. L. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};
