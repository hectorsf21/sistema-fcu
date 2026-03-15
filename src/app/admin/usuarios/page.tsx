"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaUserPlus, FaEnvelope, FaLock, FaChevronLeft, FaSave, FaUser } from 'react-icons/fa';

export default function UsuariosAdmin() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [permisos, setPermisos] = useState({
        proyectos: false,
        planTrabajo: false,
        denuncias: false,
        noticias: false,
        cargos: false,
        estadisticas: false,
    });
    const [mensaje, setMensaje] = useState({ error: false, texto: '' });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPermisos({
            ...permisos,
            [e.target.name]: e.target.checked
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí iría la lógica para enviar al backend
        console.log("Datos del nuevo usuario:", {
            nombre,
            apellido,
            correo,
            password,
            permisos,
            // Los siguientes son definidos por el sistema, no modificables aquí por usuarios normales
            bitacora: false,
            usuarios: false,
        });

        setMensaje({ error: false, texto: 'Usuario creado exitosamente con los permisos seleccionados.' });

        // Limpiar el formulario
        setNombre('');
        setApellido('');
        setCorreo('');
        setPassword('');
        setPermisos({
            proyectos: false,
            planTrabajo: false,
            denuncias: false,
            noticias: false,
            cargos: false,
            estadisticas: false,
        });

        setTimeout(() => setMensaje({ error: false, texto: '' }), 5000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin" className="text-[#0274be] hover:text-[#015a94] transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow-md">
                        <FaChevronLeft className="text-xl" />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800 flex items-center gap-3">
                        <FaUserPlus className="text-[#0274be]" />
                        Creación de Usuarios Administradores
                    </h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-[#0274be] to-[#015a94] p-6 text-white border-b-4 border-[#EEBF31]">
                        <h2 className="text-xl font-bold">Nuevo Administrador</h2>
                        <p className="text-blue-100 mt-1 opacity-90 text-sm">Configure los datos de acceso y los módulos permitidos</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {mensaje.texto && (
                            <div className={`mb-6 p-4 rounded-lg font-medium text-sm border-l-4 ${mensaje.error ? 'bg-red-50 text-red-700 border-red-500' : 'bg-green-50 text-green-700 border-green-500'}`}>
                                {mensaje.texto}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Columna Izquierda: Credenciales */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Datos Personales y Acceso</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Nombre</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                                <FaUser />
                                            </span>
                                            <input
                                                type="text"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50 text-sm"
                                                placeholder="Ej. Juan"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Apellido</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                                <FaUser />
                                            </span>
                                            <input
                                                type="text"
                                                value={apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50 text-sm"
                                                placeholder="Ej. Pérez"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Correo Electrónico</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                            <FaEnvelope />
                                        </span>
                                        <input
                                            type="email"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50 text-sm"
                                            placeholder="admin@fcu.edu.ve"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide text-xs">Contraseña</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                            <FaLock />
                                        </span>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition-all bg-gray-50 text-sm"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Mínimo 6 caracteres.</p>
                                </div>
                            </div>

                            {/* Columna Derecha: Permisos */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Permisos de Módulos</h3>
                                <p className="text-sm text-gray-600 mb-4">Seleccione los módulos que este usuario podrá gestionar.</p>

                                <div className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="proyectos"
                                            checked={permisos.proyectos}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Proyectos</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="planTrabajo"
                                            checked={permisos.planTrabajo}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Plan de Trabajo</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="denuncias"
                                            checked={permisos.denuncias}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Denuncias</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="noticias"
                                            checked={permisos.noticias}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Noticias</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="cargos"
                                            checked={permisos.cargos}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Cargos</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="estadisticas"
                                            checked={permisos.estadisticas}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 rounded border-gray-300 text-[#0274be] focus:ring-[#0274be] transition-colors cursor-pointer"
                                        />
                                        <span className="text-gray-700 font-medium group-hover:text-[#0274be] transition-colors">Estadísticas</span>
                                    </label>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                                    <strong className="text-xs uppercase tracking-wide text-[#0274be] block mb-1">Nota del Sistema</strong>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Los módulos de <b>Bitácora</b> y gestión de <b>Usuarios</b> están restringidos exclusivamente al Super Administrador por razones de seguridad.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => { setNombre(''); setApellido(''); setCorreo(''); setPassword(''); }}
                                className="px-6 py-3 rounded-xl font-bold bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
                            >
                                LIMPIAR
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-xl font-bold bg-[#0274be] text-white hover:bg-[#015a94] shadow-lg hover:shadow-[#0274be]/30 transition-all flex items-center gap-2 active:scale-95 focus:ring-2 focus:ring-[#0274be] focus:ring-offset-2 focus:outline-none"
                            >
                                <FaSave /> GUARDAR USUARIO
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
