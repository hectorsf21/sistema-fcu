"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaUsers, FaUniversity, FaUserTie, FaEye, FaEdit, FaTimes, FaCamera, FaSave, FaChevronLeft, FaMapMarkerAlt } from 'react-icons/fa';

const CARGOS_FEDERACION = [
    "Presidencia",
    "Vicepresidencia Territorial",
    "Vicepresidencia",
    "Secretaría General",
    "Secretaría de Asuntos Académicos",
    "Formación",
    "FAMES",
    "Asuntos Ecológicos",
    "Secretaría de Cultura",
    "Secretaría de Finanzas",
    "Deporte y Recreación",
    "Socio Productivo",
    "Técnica Electoral",
    "Secretaría de Organización",
    "Comedores",
    "Ciencia y Tecnología",
    "Actas y Correspondencias",
    "Secretaría Vivir Bien Estudiantil",
    "Secretaría de Movilización",
    "Secretaría de Comunicación"
];

const AREAS_CENTROS = [
    "Área de Ingeniería Agronómica",
    "Área de Ingeniería de Sistemas",
    "Área de Ciencias de la Salud",
    "Área de Medicina Veterinaria",
    "Área de Ciencias Políticas y Jurídicas",
    "Área de Odontología",
    "Área de Ingeniería, Arquitectura y Tecnología",
    "Área de Ciencias de la Educación",
    "Área de Letras y Artes",
    "Área de Ciencias Económicas y Sociales",
    "Valle de la Pascua",
    "Maturín",
    "Mapire",
    "Apure"
];

const CARGOS_CENTRO = [
    "Presidente",
    "Vicepresidente",
    "Secretario General",
    "Sec. Organización",
    "Consejero de Área",
    "Sec. FAMES",
    "Sec. Cultura",
    "Sec. Finanzas",
    "Sec. Comedores",
    "Sec. Asuntos Ecológicos",
    "Sec. Vivir Bien Estudiantil",
    "Sec. Formación",
    "Sec. Movilización",
    "Sec. Comunicación",
    "Sec. Asuntos Académicos",
    "Sec. Asuntos Territoriales",
    "Sec. Asuntos Electorales",
    "Sec. Socioproductivo",
    "Sec. Ciencia y Tecnología",
    "Sec. Actas y Correspondencia",
    "Sec. Deporte"
];

// Simulamos una base de datos de personas asignadas
const MOCK_DATA_CARGOS: Record<string, any> = {
    "Presidencia": { nombres: "Carlos", apellidos: "Mendoza", fechaNacimiento: "1998-05-14", telefono: "0414-1234567", cedula: "V-26123456", correo: "carlos@example.com", direccion: "Av. Principal, Edificio B" },
    "Secretaría General": { nombres: "Ana", apellidos: "Rojas", fechaNacimiento: "2000-11-20", telefono: "0424-9876543", cedula: "V-28987654", correo: "ana@example.com", direccion: "Calle 4, Casa 12" },
    "Área de Ingeniería de Sistemas-Presidente": { nombres: "Luis", apellidos: "Gómez", fechaNacimiento: "2001-08-10", telefono: "0412-1112233", cedula: "V-27111222", correo: "luis@example.com", direccion: "Sector Centro" }
};

type ViewState = 'SELECTION' | 'FEDERACION' | 'AREAS' | 'CARGOS_CENTRO';

export default function CargosAdminPage() {
    const [view, setView] = useState<ViewState>('SELECTION');
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [selectedCargo, setSelectedCargo] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<'VER' | 'EDITAR' | null>(null);

    // Form data state
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        telefono: '',
        cedula: '',
        correo: '',
        direccion: '',
    });

    const getCargoKey = (cargo: string) => {
        return view === 'CARGOS_CENTRO' && selectedArea ? `${selectedArea}-${cargo}` : cargo;
    };

    const openModal = (cargo: string, mode: 'VER' | 'EDITAR') => {
        setSelectedCargo(cargo);
        setModalMode(mode);
        const key = getCargoKey(cargo);
        // Load mock data if it exists, otherwise empty string
        const data = MOCK_DATA_CARGOS[key] || { nombres: '', apellidos: '', fechaNacimiento: '', telefono: '', cedula: '', correo: '', direccion: '' };
        setFormData(data);
    };

    const closeModal = () => {
        setSelectedCargo(null);
        setModalMode(null);
    };

    const handleBack = () => {
        if (view === 'CARGOS_CENTRO') {
            setView('AREAS');
            setSelectedArea(null);
        } else if (view === 'FEDERACION' || view === 'AREAS') {
            setView('SELECTION');
        }
    };

    const handleSelectArea = (area: string) => {
        setSelectedArea(area);
        setView('CARGOS_CENTRO');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <header className="bg-[#021f31] text-white p-4 shadow-md flex justify-between items-center px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#0274be] p-2 rounded-lg font-bold shadow-lg text-sm">ORG</div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Gestión de Cargos</h1>
                </div>
                {view === 'SELECTION' ? (
                    <Link href="/admin" className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                        <FaArrowLeft /> <span className="hidden sm:inline">Volver al Panel</span>
                    </Link>
                ) : (
                    <button onClick={handleBack} className="flex items-center gap-2 text-slate-300 hover:text-[#EEBF31] transition-colors text-sm font-medium">
                        <FaArrowLeft /> Regresar
                    </button>
                )}
            </header>

            <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

                {/* VISTA 1: SELECCIÓN DE CATEGORÍA */}
                {view === 'SELECTION' && (
                    <div className="animate-fadeIn">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Estructura Organizativa</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Seleccione la instancia organizativa que desea gestionar.</p>
                            <div className="w-24 h-1 bg-[#EEBF31] mx-auto mt-6 rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card Federación */}
                            <button
                                onClick={() => setView('FEDERACION')}
                                className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#0274be] hover:shadow-2xl transition-all transform hover:-translate-y-2 group text-left flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute -right-10 -bottom-10 text-[#0274be] opacity-5 group-hover:scale-150 transition-transform duration-500">
                                    <FaUsers size={200} />
                                </div>
                                <div className="bg-blue-50 text-[#0274be] p-6 rounded-full mb-6 group-hover:bg-[#0274be] group-hover:text-white transition-colors shadow-sm">
                                    <FaUsers size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Federación de Centros Universitarios (FCU)</h3>
                                <p className="text-gray-500">Gestionar Presidente, Vicepresidentes y Secretarías Generales a nivel central.</p>
                                <span className="mt-8 text-[#0274be] font-bold group-hover:text-[#CB2229] transition-colors flex items-center gap-2">Ingresar <FaArrowLeft className="rotate-180" /></span>
                            </button>

                            {/* Card Centros Universitarios/Areas */}
                            <button
                                onClick={() => setView('AREAS')}
                                className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-[#CB2229] hover:shadow-2xl transition-all transform hover:-translate-y-2 group text-left flex flex-col items-center text-center relative overflow-hidden"
                            >
                                <div className="absolute -right-10 -bottom-10 text-[#CB2229] opacity-5 group-hover:scale-150 transition-transform duration-500">
                                    <FaUniversity size={200} />
                                </div>
                                <div className="bg-red-50 text-[#CB2229] p-6 rounded-full mb-6 group-hover:bg-[#CB2229] group-hover:text-white transition-colors shadow-sm">
                                    <FaUniversity size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Centros Universitarios <br />(Autónomos)</h3>
                                <p className="text-gray-500">Gestionar la estructura y directiva de cada centro de estudiantes por Área o Núcleo.</p>
                                <span className="mt-8 text-[#CB2229] font-bold group-hover:text-[#0274be] transition-colors flex items-center gap-2">Ingresar <FaArrowLeft className="rotate-180" /></span>
                            </button>
                        </div>
                    </div>
                )}

                {/* VISTA 2: LISTA GENERAL DE CARGOS ({FEDERACION o CENTRO ESPECÍFICO}) */}
                {(view === 'FEDERACION' || view === 'CARGOS_CENTRO') && (
                    <div className="animate-fadeIn">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    {view === 'FEDERACION' ? (
                                        <><FaUsers className="text-[#0274be]" /> Federación de Centros Universitarios</>
                                    ) : (
                                        <><FaUniversity className="text-[#CB2229]" /> Centro Universitario: {selectedArea}</>
                                    )}
                                </h2>
                                <p className="text-gray-500 mt-2">Lista principal de cargos directivos y secretarías.</p>
                            </div>
                            <button onClick={handleBack} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium flex items-center gap-2 w-fit">
                                <FaChevronLeft /> Volver
                            </button>
                        </div>

                        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cargo Oficial</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ocupante Actual</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {(view === 'FEDERACION' ? CARGOS_FEDERACION : CARGOS_CENTRO).map((cargo, idx) => {
                                            const asignado = MOCK_DATA_CARGOS[getCargoKey(cargo)];
                                            return (
                                                <tr key={idx} className="hover:bg-blue-50/40 transition">
                                                    <td className="px-6 py-4 font-bold text-gray-700 flex items-center gap-3">
                                                        <div className={`p-2 rounded-full ${idx === 0 ? 'bg-yellow-100 text-[#EEBF31]' : idx < 3 ? 'bg-red-100 text-[#CB2229]' : 'bg-blue-100 text-[#0274be]'}`}>
                                                            <FaUserTie />
                                                        </div>
                                                        {cargo}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {asignado ? (
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold text-gray-800">{asignado.nombres} {asignado.apellidos}</span>
                                                                <span className="text-xs text-gray-500 font-mono">{asignado.cedula}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs font-medium bg-gray-100 text-gray-400 px-3 py-1 rounded-full border border-gray-200">
                                                                Vacante
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => openModal(cargo, 'VER')}
                                                                className="p-2 border border-gray-200 text-[#0274be] hover:bg-blue-50 rounded-lg hover:border-[#0274be] transition tooltip" title="Ver Detalles"
                                                            >
                                                                <FaEye />
                                                            </button>
                                                            <button
                                                                onClick={() => openModal(cargo, 'EDITAR')}
                                                                className="p-2 border border-gray-200 text-[#CB2229] hover:bg-red-50 rounded-lg hover:border-[#CB2229] transition tooltip" title="Editar/Asignar"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* VISTA 3: LISTADO DE AREAS PARA CENTROS */}
                {view === 'AREAS' && (
                    <div className="animate-fadeIn">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <FaUniversity className="text-[#CB2229]" /> Seleccione un Área o Núcleo
                                </h2>
                                <p className="text-gray-500 mt-2">Organización de Centros Universitarios por Facultades y zonas foráneas.</p>
                            </div>
                            <button onClick={handleBack} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium flex items-center gap-2">
                                <FaChevronLeft /> Volver
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {AREAS_CENTROS.map((area, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectArea(area)}
                                    className="bg-white border text-left border-gray-200 p-5 rounded-xl hover:border-[#CB2229] hover:shadow-lg transition-all group flex items-start gap-4"
                                >
                                    <div className="bg-red-50 text-[#CB2229] p-3 rounded-lg group-hover:bg-[#CB2229] group-hover:text-white transition-colors">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-[#CB2229] transition-colors">{area}</h4>
                                        <span className="text-xs text-gray-500 mt-1 block">Ver cargos de este Centro</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL VER / EDITAR CARGO */}
            {selectedCargo && modalMode && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>

                    <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header Modal */}
                        <div className={`p-6 text-white flex justify-between items-center ${modalMode === 'VER' ? 'bg-[#0274be]' : 'bg-[#EEBF31] text-gray-900'}`}>
                            <div>
                                <h3 className="text-xl font-extrabold flex items-center gap-2">
                                    {modalMode === 'VER' ? <FaEye /> : <FaEdit />}
                                    {modalMode === 'VER' ? 'Detalles del Cargo' : 'Editar Información'}
                                    {view === 'CARGOS_CENTRO' && ` (${selectedArea})`}
                                </h3>
                                <p className={`text-sm mt-1 font-bold ${modalMode === 'VER' ? 'text-blue-100' : 'text-gray-700'}`}>{selectedCargo}</p>
                            </div>
                            <button onClick={closeModal} className={`${modalMode === 'VER' ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-red-600'} transition`}>
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Contenido / Formulario */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/50">

                            {/* Area Fotografía */}
                            <div className="flex justify-center mb-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <FaUserTie className="text-6xl text-gray-400" />
                                    </div>
                                    {modalMode === 'EDITAR' && (
                                        <label className="absolute bottom-0 right-0 bg-[#0274be] text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition">
                                            <FaCamera />
                                            <input type="file" className="hidden" accept="image/*" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Nombres</label>
                                        <input
                                            type="text"
                                            value={formData.nombres}
                                            onChange={e => setFormData({ ...formData, nombres: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 font-semibold text-gray-800 text-lg' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm'}`}
                                            placeholder="Ingresar nombres"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Apellidos</label>
                                        <input
                                            type="text"
                                            value={formData.apellidos}
                                            onChange={e => setFormData({ ...formData, apellidos: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 font-semibold text-gray-800 text-lg' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm'}`}
                                            placeholder="Ingresar apellidos"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Cédula de Identidad</label>
                                        <input
                                            type="text"
                                            value={formData.cedula}
                                            onChange={e => setFormData({ ...formData, cedula: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border font-mono ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 text-gray-800' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm'}`}
                                            placeholder="V-12345678"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            value={formData.fechaNacimiento}
                                            onChange={e => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 text-gray-800' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm text-gray-600'}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Teléfono de Contacto</label>
                                        <input
                                            type="tel"
                                            value={formData.telefono}
                                            onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 text-gray-800' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm'}`}
                                            placeholder="0414-XXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            value={formData.correo}
                                            onChange={e => setFormData({ ...formData, correo: e.target.value })}
                                            readOnly={modalMode === 'VER'}
                                            className={`w-full px-4 py-3 rounded-xl border ${modalMode === 'VER' ? 'bg-transparent border-transparent px-0 text-gray-800' : 'bg-white border-gray-300 focus:ring-2 focus:ring-[#EEBF31] outline-none shadow-sm'}`}
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Dirección de Habitación</label>
                                    {modalMode === 'VER' ? (
                                        <p className="py-2 text-gray-800 bg-transparent">{formData.direccion || 'No registrada'}</p>
                                    ) : (
                                        <textarea
                                            rows={3}
                                            value={formData.direccion}
                                            onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EEBF31] outline-none resize-none shadow-sm"
                                            placeholder="Indique dirección completa..."
                                        ></textarea>
                                    )}
                                </div>

                            </form>
                        </div>

                        {/* Footer del Modal */}
                        <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-3 px-4 font-bold rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                {modalMode === 'VER' ? 'Cerrar' : 'Cancelar'}
                            </button>

                            {modalMode === 'EDITAR' && (
                                <button
                                    onClick={() => {
                                        alert("Información Guardada Correctamente (Simulación)");
                                        closeModal();
                                    }}
                                    className="flex-1 py-3 px-4 font-bold rounded-xl text-gray-900 bg-[#EEBF31] hover:bg-yellow-500 shadow-md transition flex items-center justify-center gap-2"
                                >
                                    <FaSave /> Guardar Cambios
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
