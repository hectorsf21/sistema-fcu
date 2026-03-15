"use client";
import React from 'react';
import Link from 'next/link';
import {
    FaUserTie,
    FaProjectDiagram,
    FaCalendarAlt,
    FaNewspaper,
    FaBook,
    FaChartBar,
    FaArrowLeft,
    FaBullhorn,
    FaUserPlus
} from 'react-icons/fa';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar Simple para el Panel de Administración */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0274be] p-2 rounded-lg font-bold shadow-lg text-sm">FCU</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Panel de Administración</h1>
                </div>
                <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                    <FaArrowLeft /> <span className="hidden sm:inline">Volver al Inicio</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Bienvenido al Sistema</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Seleccione el módulo al que desea ingresar para gestionar el contenido de la plataforma de la Federación de Centros de Estudiantes.
                    </p>
                    <div className="w-24 h-1 bg-[#EEBF31] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Grid de Botones/Tarjetas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    <DashboardCard
                        href="/admin/cargos"
                        title="Subir Cargos"
                        desc="Gestiona los cargos y posiciones dentro de la estructura general de la organización."
                        icon={<FaUserTie className="text-5xl text-[#0274be]" />}
                        color="border-[#0274be]"
                    />

                    <DashboardCard
                        href="/admin/proyectos"
                        title="Mis Proyectos"
                        desc="Registra y visualiza tus proyectos académicos y sociales impulsados por la FCU."
                        icon={<FaProjectDiagram className="text-5xl text-[#CB2229]" />}
                        color="border-[#CB2229]"
                    />

                    <DashboardCard
                        href="/admin/proyectos/gestion"
                        title="Gestión de Proyectos"
                        desc="Panel administrativo para visualizar y cambiar el estatus de todos los proyectos."
                        icon={<FaProjectDiagram className="text-5xl text-[#0274be]" />}
                        color="border-[#0274be]"
                    />

                    <DashboardCard
                        href="/admin/plan-trabajo"
                        title="Mi Plan de Trabajo"
                        desc="Administra y visualiza tu planificación a corto y largo plazo personal."
                        icon={<FaCalendarAlt className="text-5xl text-[#EEBF31]" />}
                        color="border-[#EEBF31]"
                    />

                    <DashboardCard
                        href="/admin/plan-trabajo/gestion"
                        title="Gestión de Planes"
                        desc="Panel administrativo para revisar y evaluar todos los planes de trabajo subidos."
                        icon={<FaCalendarAlt className="text-5xl text-[#CB2229]" />}
                        color="border-[#CB2229]"
                    />

                    <DashboardCard
                        href="/admin/noticias"
                        title="Subir Noticias"
                        desc="Publica y difunde las últimas novedades, eventos y anuncios de interés para la comunidad."
                        icon={<FaNewspaper className="text-5xl text-[#0274be]" />}
                        color="border-[#0274be]"
                    />

                    <DashboardCard
                        href="/admin/bitacora"
                        title="Bitácora"
                        desc="Lleva el registro detallado y realiza seguimiento integral de todas las acciones operativas."
                        icon={<FaBook className="text-5xl text-[#CB2229]" />}
                        color="border-[#CB2229]"
                    />

                    <DashboardCard
                        href="/admin/estadisticas"
                        title="Estadísticas"
                        desc="Visualiza los datos, reportes y métricas de uso del sistema de forma actualizada."
                        icon={<FaChartBar className="text-5xl text-[#EEBF31]" />}
                        color="border-[#EEBF31]"
                    />

                    <DashboardCard
                        href="/admin/denuncias"
                        title="Visualizar Denuncias"
                        desc="Revisa y gestiona los reportes, incidencias o quejas enviadas por la comunidad estudiantil."
                        icon={<FaBullhorn className="text-5xl text-[#0274be]" />}
                        color="border-[#0274be]"
                    />

                    <DashboardCard
                        href="/admin/usuarios"
                        title="Crear Usuarios"
                        desc="Registra nuevos usuarios administradores y gestiona sus permisos y acceso a módulos."
                        icon={<FaUserPlus className="text-5xl text-[#CB2229]" />}
                        color="border-[#CB2229]"
                    />

                </div>
            </main>

            {/* Footer sencillo */}
            <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500 mt-auto">
                <p>© {new Date().getFullYear()} FCU UNERG. Panel Administrativo.</p>
            </footer>
        </div>
    );
}

// Componente individual para las tarjetas del dashboard
function DashboardCard({ href, title, desc, icon, color }: { href: string, title: string, desc: string, icon: React.ReactNode, color: string }) {
    return (
        <Link href={href} className="block group h-full">
            <div className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 ${color} transform group-hover:-translate-y-2 h-full flex flex-col items-center text-center relative overflow-hidden`}>
                {/* Adorno de fondo extraído del icono */}
                <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none transition-transform group-hover:scale-150 group-hover:-rotate-12">
                    {icon}
                </div>

                <div className="mb-6 p-5 bg-gray-50 rounded-full group-hover:scale-110 transition-transform shadow-sm">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">{desc}</p>

                <div className="mt-6 font-bold text-[#0274be] group-hover:text-[#CB2229] transition-colors flex items-center justify-center gap-2">
                    Ingresar al Módulo
                </div>
            </div>
        </Link>
    );
}