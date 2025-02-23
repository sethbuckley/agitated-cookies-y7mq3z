import React, { useState, useCallback } from 'react';

interface ElementData {
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  summary: string;
  appearance: string;
  discoveredBy: string;
  phase: string;
}

const periodicTableData: ElementData[] = [
  {
    name: 'Hydrogen',
    symbol: 'H',
    atomicNumber: 1,
    atomicMass: 1.008,
    category: 'diatomic nonmetal',
    summary: 'Hydrogen is a chemical element with the symbol H and atomic number 1. It is the lightest element and, at standard conditions, is a diatomic gas with the molecular formula H2. It is colorless, odorless, nonmetallic, and highly flammable.',
    appearance: 'colorless gas',
    discoveredBy: 'Henry Cavendish',
    phase: 'Gas',
  },
  {
    name: 'Helium',
    symbol: 'He',
    atomicNumber: 2,
    atomicMass: 4.002602,
    category: 'noble gas',
    summary: 'Helium is a chemical element with the symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table.',
    appearance: 'colorless gas',
    discoveredBy: 'Pierre Janssen, Norman Lockyer',
    phase: 'Gas',
  },
  {
    name: 'Lithium',
    symbol: 'Li',
    atomicNumber: 3,
    atomicMass: 6.94,
    category: 'alkali metal',
    summary: 'Lithium is a chemical element with the symbol Li and atomic number 3. It is a soft, silvery-white alkali metal. Under standard conditions, it is the lightest metal and the least dense solid element.',
    appearance: 'silvery-white',
    discoveredBy: 'Johan August Arfwedson',
    phase: 'Solid',
  },
  {
    name: 'Beryllium',
    symbol: 'Be',
    atomicNumber: 4,
    atomicMass: 9.012183,
    category: 'alkaline earth metal',
    summary: 'Beryllium is a chemical element with the symbol Be and atomic number 4. It is a relatively rare element in the universe, usually occurring as a product of the spallation of larger atomic nuclei that have collided with cosmic rays.',
    appearance: 'grayish white',
    discoveredBy: 'Louis-Nicolas Vauquelin',
    phase: 'Solid',
  },
  {
    name: 'Boron',
    symbol: 'B',
    atomicNumber: 5,
    atomicMass: 10.81,
    category: 'metalloid',
    summary: 'Boron is a chemical element with the symbol B and atomic number 5. It is a low-abundance element in the Solar System and in the Earths crust. Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, the borate minerals.',
    appearance: 'black',
    discoveredBy: 'Joseph Louis Gay-Lussac, Louis Jacques Thénard',
    phase: 'Solid',
  },
  {
    name: 'Carbon',
    symbol: 'C',
    atomicNumber: 6,
    atomicMass: 12.011,
    category: 'polyatomic nonmetal',
    summary: 'Carbon is a chemical element with the symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds. There are three naturally occurring isotopes, with 12C and 13C being stable and 14C being a radionuclide, decaying with a half-life of about 5,730 years.',
    appearance: 'black (graphite), colorless (diamond)',
    discoveredBy: 'Ancient Egypt',
    phase: 'Solid',
  },
  {
    name: 'Nitrogen',
    symbol: 'N',
    atomicNumber: 7,
    atomicMass: 14.007,
    category: 'diatomic nonmetal',
    summary: 'Nitrogen is a chemical element with the symbol N and atomic number 7. It was first discovered and isolated by Scottish physician Daniel Rutherford in 1772.',
    appearance: 'colorless gas',
    discoveredBy: 'Daniel Rutherford',
    phase: 'Gas',
  },
  {
    name: 'Oxygen',
    symbol: 'O',
    atomicNumber: 8,
    atomicMass: 15.999,
    category: 'diatomic nonmetal',
    summary: 'Oxygen is a chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds.',
    appearance: 'colorless gas',
    discoveredBy: 'Carl Wilhelm Scheele',
    phase: 'Gas',
  },
  {
    name: 'Fluorine',
    symbol: 'F',
    atomicNumber: 9,
    atomicMass: 18.99840316,
    category: 'diatomic nonmetal',
    summary: 'Fluorine is a chemical element with the symbol F and atomic number 9. It is the lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard conditions.',
    appearance: 'pale yellow gas',
    discoveredBy: 'Henri Moissan',
    phase: 'Gas',
  },
  {
    name: 'Neon',
    symbol: 'Ne',
    atomicNumber: 10,
    atomicMass: 20.1797,
    category: 'noble gas',
    summary: 'Neon is a chemical element with the symbol Ne and atomic number 10. It is a noble gas. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.',
    appearance: 'colorless gas',
    discoveredBy: 'William Ramsay, Morris Travers',
    phase: 'Gas',
  },
  {
    name: 'Sodium',
    symbol: 'Na',
    atomicNumber: 11,
    atomicMass: 22.98976928,
    category: 'alkali metal',
    summary: 'Sodium is a chemical element with the symbol Na and atomic number 11. It is a soft, silvery-white, highly reactive metal. Sodium is an alkali metal, being in group 1 of the periodic table. Its only stable isotope is 23Na.',
    appearance: 'silvery white',
    discoveredBy: 'Humphry Davy',
    phase: 'Solid',
  },
  {
    name: 'Magnesium',
    symbol: 'Mg',
    atomicNumber: 12,
    atomicMass: 24.305,
    category: 'alkaline earth metal',
    summary: 'Magnesium is a chemical element with the symbol Mg and atomic number 12. It is a shiny gray solid which bears a close physical resemblance to the other five elements in the second column (group 2, or alkaline earth metals) of the periodic table: they each have the same electron configuration in the outer electron shell and a similar crystal structure.',
    appearance: 'shiny grey solid',
    discoveredBy: 'Joseph Black',
    phase: 'Solid',
  },
];

const elementCategoryColors: { [key: string]: string } = {
  'alkali metal': 'bg-red-200',
  'alkaline earth metal': 'bg-red-300',
  'diatomic nonmetal': 'bg-green-200',
  'noble gas': 'bg-blue-200',
  'metalloid': 'bg-yellow-200',
  'polyatomic nonmetal': 'bg-purple-200',
  'transition metal': 'bg-orange-200',
  'post-transition metal': 'bg-teal-200',
  'lanthanide': 'bg-pink-200',
  'actinide': 'bg-indigo-200',
};


const PeriodicTable: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  const handleElementClick = useCallback((element: ElementData) => {
    setSelectedElement(element);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedElement(null);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Periodic Table of Elements</h1>

      <div className="grid grid-cols-10 gap-2">
        {periodicTableData.map((element) => (
          <div
            key={element.atomicNumber}
            className={`border rounded-md p-2 cursor-pointer ${elementCategoryColors[element.category] || 'bg-gray-100'}`}
            onClick={() => handleElementClick(element)}
          >
            <div className="font-bold text-center">{element.symbol}</div>
            <div className="text-sm text-center">{element.atomicNumber}</div>
          </div>
        ))}
      </div>

      {selectedElement && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-2">{selectedElement.name} ({selectedElement.symbol})</h2>
            <p>Atomic Number: {selectedElement.atomicNumber}</p>
            <p>Atomic Mass: {selectedElement.atomicMass}</p>
            <p>Category: {selectedElement.category}</p>
            <p>Phase: {selectedElement.phase}</p>
            <p>Discovered By: {selectedElement.discoveredBy}</p>
            <p className="mt-2">{selectedElement.summary}</p>
            <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;