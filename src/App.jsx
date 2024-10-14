// src/App.jsx
import React, { useState } from 'react';
import ModelViewer from './ModelViewer';

const sections = [
  { id: 'products', title: 'Productos Estrella', description: 'Bienvenidos a nuestra presentación técnica. Descubre nuestros productos estrella y sus beneficios.', image: 'img/image2.gif' },
  { id: 'cleaning', title: 'Producto Limpieza', description: 'Este producto es ideal para mantener la limpieza y cuidado de tu entorno.', model: 'img/model3d11.glb' },
  { id: 'fixing', title: 'Producto Reparación', description: 'Herramientas y soluciones efectivas para reparar y mejorar cualquier superficie.', model: 'img/model3d10.glb' },
  { id: 'delaners', title: 'Producto Delineador', description: 'Excelente para marcar y delinear con precisión, adaptándose a tus necesidades.', model: 'img/model3d12.glb' },
  { id: 'sealing', title: 'Producto Sellado', description: 'Soluciones duraderas y efectivas para el sellado en cualquier superficie.', model: 'img/model3d13.glb' },
];

function App() {
  const [activeSection, setActiveSection] = useState('products');

  const nextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex].id);
  };

  const prevSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    setActiveSection(sections[prevIndex].id);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-200 text-gray-800">
      {/* Barra de Navegación */}
      <nav className="bg-white shadow-md text-gray-800 p-4 fixed w-full flex justify-between items-center z-10">
        <div className="font-bold text-2xl text-blue-600">Shining World Solutions</div>
        <ul className="flex space-x-6">
          {sections.map(section => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`hover:text-blue-600 ${activeSection === section.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Secciones */}
      {sections.map(section => (
        <section
          key={section.id}
          className={`w-full flex flex-col md:flex-row items-center justify-center h-screen text-center md:text-left pt-24 ${activeSection === section.id ? 'block' : 'hidden'}`}
        >
          {/* Mostrar Imagen o Modelo 3D según la sección */}
          {section.image ? (
            <img 
              src={section.image} 
              alt={section.title} 
              className={`shadow-lg rounded-lg ${section.id === 'products' ? 'w-5/6 md:w-3/4 max-w-2xl' : 'w-full md:w-1/2 max-w-lg mb-6 md:mb-0'}`} 
            />
          ) : (
            <ModelViewer path={section.model} />
          )}
          <div className="md:ml-10 md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">{section.title}</h1>
            <p className="text-lg mb-8 text-gray-700">{section.description}</p>
            <div className="flex space-x-4">
              <button onClick={prevSection} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition transform hover:scale-105">
                Anterior
              </button>
              <button onClick={nextSection} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition transform hover:scale-105">
                Siguiente
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;
