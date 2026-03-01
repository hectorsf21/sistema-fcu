import Navbar from '@/components/Navbar';
import { FaPaperPlane, FaUpload } from 'react-icons/fa';

export default function DenunciasPage() {
    return (
        <main className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-12 px-4 bg-[#0274be] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Canal de <span className="text-[#EEBF31]">Denuncias</span>
                    </h1>
                    <p className="text-lg text-blue-100">
                        Utiliza este formulario para reportar incidencias académicas, de infraestructura o cualquier irregularidad. Tu reporte será tratado de forma confidencial.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="flex-grow py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#CB2229]">
                    <form className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombres */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombres</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. Juan Carlos"
                                    required
                                />
                            </div>

                            {/* Apellidos */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. Pérez Gómez"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Número de Cédula */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Cédula</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. V-12345678"
                                    required
                                />
                            </div>

                            {/* Número de Contacto */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Contacto</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. 0414-1234567"
                                    required
                                />
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Área a la que Pertenece */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Área (Facultad)</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition bg-white"
                                    required
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="cs-salud">Ciencias de la Salud</option>
                                    <option value="ingenieria">Ingeniería</option>
                                    <option value="agronomia">Agronomía</option>
                                    <option value="cs-economicas">Ciencias Económicas</option>
                                    <option value="odontologia">Odontología</option>
                                    <option value="otra">Otra</option>
                                </select>
                            </div>

                            {/* Semestre/Año */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Semestre/Año</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. 5to Semestre"
                                    required
                                />
                            </div>

                            {/* Sección */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Sección</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition"
                                    placeholder="Ej. M1"
                                    required
                                />
                            </div>
                        </div>

                        {/* Detalles de la denuncia */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Detalles de la Denuncia</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0274be] focus:border-transparent outline-none transition resize-none"
                                placeholder="Describa detalladamente el motivo de su reporte..."
                                required
                            ></textarea>
                        </div>

                        {/* Adjuntar Prueba */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Adjuntar Prueba (Opcional)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#0274be] hover:bg-blue-50 transition cursor-pointer relative overflow-hidden group">
                                <FaUpload className="text-3xl mb-3 text-gray-400 group-hover:text-[#0274be] transition" />
                                <span className="text-sm font-medium">Haz clic para buscar un archivo o arrástralo aquí</span>
                                <span className="text-xs text-gray-400 mt-1">Imágenes, PDF, Documentos (Máx. 5MB)</span>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                                />
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        <div className="pt-4 mt-8 border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full bg-[#0274be] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                <FaPaperPlane /> Enviar Denuncia
                            </button>
                        </div>

                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-gray-300 py-12 mt-auto">
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
