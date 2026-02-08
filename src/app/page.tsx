import Navbar from '@/components/Navbar';
import { FaUsers, FaFileUpload, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-[#0274be] via-[#0274be] to-[#015a94] text-white overflow-hidden">
        {/* Decoración de fondo (opcional) */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <FaUsers size={400} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Gestión Estudiantil Eficiente <br /> para la <span className="underline decoration-yellow-400">FCU</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Bienvenido al sistema oficial de registro 1x10 y gestión de reportes de la Federación de Centros de Estudiantes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="bg-white text-[#0274be] px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Comenzar ahora <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Información */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">¿Qué puedes hacer en el sistema?</h2>
          <div className="w-24 h-1 bg-[#0274be] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<FaUsers className="text-5xl text-[#0274be]" />}
            title="Registro 1x10"
            desc="Registra de manera ágil a los integrantes de tu equipo usando solo su número de cédula."
          />
          <FeatureCard
            icon={<FaFileUpload className="text-5xl text-[#0274be]" />}
            title="Carga de Reportes"
            desc="Sube tus archivos PDF (máximo 10MB) de forma segura y directa al servidor central."
          />
          <FeatureCard
            icon={<FaShieldAlt className="text-5xl text-[#0274be]" />}
            title="Control de Admin"
            desc="Los administradores pueden monitorear registros y descargar documentos en tiempo real."
          />
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="bg-gray-800 text-gray-400 py-10 text-center">
        <p>© {new Date().getFullYear()} FCU - Federación de Centros de Estudiantes. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

// Sub-componente para las tarjetas de características
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow text-center group">
      <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}