import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <Container>
        <div className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-bold">EcoStore</p>
            <p className="text-sm text-gray-600 mt-1">
              Sustainable clothing. Minimal lifestyle.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EcoStore. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
