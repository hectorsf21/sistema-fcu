import Navbar from '@/components/Navbar';
import { FaUsers, FaArrowRight, FaNewspaper, FaUniversity, FaBullseye, FaBullhorn, FaFolderOpen } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 bg-gradient-to-br from-[#0274be] via-[#0274be] to-[#014875] text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
          <FaUniversity size={450} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Federación de Centros Universitarios <br />
            <span className="text-[#EEBF31] drop-shadow-lg">Atención y Gestión Estudiantil</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto font-light">
            Plataforma oficial para la gestión de solicitudes, orientación académica y canalización de requerimientos de nuestra universidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="bg-[#EEBF31] text-[#0274be] px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Ingresar al Sistema <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Nosotros: Misión y Visión */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestra Identidad</h2>
            <div className="w-24 h-1 bg-[#CB2229] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Misión */}
            <div className="bg-gray-50 p-10 rounded-2xl border-t-4 border-[#0274be] shadow-lg hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-[#0274be] opacity-10 group-hover:opacity-20 transition">
                <FaBullseye size={80} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0274be] flex items-center gap-3">
                Misión
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nuestra misión es representar y defender con integridad los derechos de la comunidad estudiantil de la Universidad Nacional Experimental de los Llanos Centrales "Rómulo Gallegos ", garantizando la vigencia de una educación pública, gratuita y de excelencia. Nos constituimos como el pilar que asegura el acceso democrático al conocimiento, promoviendo condiciones dignas de bienestar y un entorno académico de alto nivel. Trabajamos para formar profesionales integrales y comprometidos con el desarrollo del país, reafirmando que la calidad académica es el derecho irrenunciable de cada estudiante Venezolano.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-gray-50 p-10 rounded-2xl border-t-4 border-[#CB2229] shadow-lg hover:shadow-xl transition relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-[#CB2229] opacity-10 group-hover:opacity-20 transition">
                <FaUniversity size={80} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#CB2229] flex items-center gap-3">
                Visión
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Consolidarnos como el movimiento estudiantil referente a nivel nacional por su vanguardia académica y compromiso social, siendo el pilar fundamental que garantice una universidad pública, gratuita y de calidad. Nos proyectamos como un agente catalizador en la transformación de la sociedad, convirtiendo la UNERG en un espacio de innovación y bienestar donde cada estudiante alcance su pleno potencial profesional. Aspiramos a formar ciudadanos éticos y líderes intelectuales capaces de trascender las aulas para generar soluciones reales a los desafíos del país, liderando la formación y la inteligencia que transformará a Venezuela. ¡Por una universidad gratuita, científica y al servicio del pueblo!
              </p>
            </div>
          </div>

          {/* Objetivos */}
          <div className="mt-10 bg-gray-50 p-10 rounded-2xl border-t-4 border-[#EEBF31] shadow-lg hover:shadow-xl transition relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-[#EEBF31] opacity-10 group-hover:opacity-20 transition">
              <FaUsers size={80} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#EEBF31] flex items-center gap-3">
              Objetivos
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Consolidar una Federación de Centros Universitarios (FCU) que sea el reflejo fiel del sentir colectivo y la identidad unergista, fundamentada en la unidad política para potenciar el desarrollo integral del estudiante. Nuestra gestión se dedicará a la conquista y consolidación de reivindicaciones históricas, transformando el compromiso académico en bienestar social, y asegurando que cada pasillo de la UNERG sea un espacio de oportunidades, justicia y orgullo para quienes forjan el futuro de Venezuela desde el corazón de los Llanos.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios del Sistema (Remplazo de los módulos) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">Servicios de Atención</h2>
          <div className="w-24 h-1 bg-[#0274be] mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            La FCU pone a tu disposición este portal web para facilitar tu vida universitaria, acercando las soluciones directamente a ti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <ServiceCard
            icon={<FaBullhorn className="text-5xl text-[#CB2229]" />}
            title="Canal de Denuncias"
            desc="Un espacio directo y confidencial para reportar incidencias académicas, de infraestructura o cualquier irregularidad."
          />
          <ServiceCard
            icon={<FaFolderOpen className="text-5xl text-[#EEBF31]" />}
            title="Gestión de Trámites"
            desc="Centraliza tus requerimientos. Agiliza procesos y recibe apoyo de la Federación para solventar problemas administrativos."
          />
          <ServiceCard
            icon={<FaUsers className="text-5xl text-[#0274be]" />}
            title="Acompañamiento"
            desc="Recibe orientación constante para el cumplimiento de tus derechos y la correcta integración a la vida universitaria."
          />
        </div>
      </section>

      {/* Sección de Noticias */}
      <section id="noticias" className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Últimas Noticias</h2>
              <div className="w-24 h-1 bg-[#EEBF31] mt-4 rounded-full"></div>
            </div>
            <Link href="#" className="hidden md:flex text-[#0274be] font-bold hover:text-[#CB2229] items-center gap-2 transition">
              Ver todas <FaArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <NewsCard
              category="Académico"
              title="Inicio del Nuevo Periodo Académico"
              desc="Las autoridades confirmaron las fechas de inicio de clases para todas las áreas. Conoce el calendario completo aquí."
              color="#0274be"
            />
            <NewsCard
              category="Gestión FCU"
              title="Nuevas Unidades de Transporte"
              desc="La FCU logra acuerdo para incorporar nuevas unidades de transporte en beneficio de toda la comunidad estudiantil."
              color="#CB2229"
            />
            <NewsCard
              category="Deportes"
              title="Juegos Inter-Áreas Universitarios"
              desc="Prepárate para apoyar a tu facultad en la próxima edición de los juegos deportivos universitarios."
              color="#EEBF31"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">FCU UNERG</h4>
            <p className="text-sm">Federación de Centros de Estudiantes.</p>
          </div>
          <div className="flex justify-center space-x-6 text-2xl">
            {/* Agrega aquí los iconos de redes sociales de la FCU si los tienes */}
          </div>
          <div className="md:text-right">
            <p className="text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
            <p className="text-xs mt-2 text-[#EEBF31]">Plataforma de Atención Estudiantil</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Sub-componente para las tarjetas de servicios (Remplazó a Módulos)
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2">
      <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

// Sub-componente para las tarjetas de noticias
function NewsCard({ category, title, desc, color }: { category: string, title: string, desc: string, color: string }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="h-48 flex items-center justify-center text-white relative" style={{ backgroundColor: color }}>
        <FaNewspaper className="text-6xl opacity-80" />
        <span className="absolute bottom-3 left-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          {category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{desc}</p>
        <button className="font-bold hover:underline flex items-center gap-2 mt-auto" style={{ color: color }}>
          Leer más <FaArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}