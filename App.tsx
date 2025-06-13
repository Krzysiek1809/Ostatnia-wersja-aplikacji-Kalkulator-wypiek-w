
import React, { useState, useCallback, useEffect } from 'react';
import { CALCULATOR_CONFIGS, ROLL_CONFIG, ROGAL_CONFIG, RYE_FIT_CONFIG, CIABATTA_CONFIG, WIEJSKA_CONFIG } from './constants';
import { CalculatedIngredient, RollType, Ingredient, CalculatorConfig } from './types';

// --- Icon Components ---

const BagOfFlourIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-3">
    <path fill="#F5F5F5" d="M5,18 C5,18 5.0208747,5.24152856 5,5 C5,3.8954305 5.8954305,3 7,3 L13,3 C14.1045695,3 15,3.8954305 15,5 C14.9791253,5.24152856 15,18 15,18 L5,18 Z" />
    <path fill="#E0E0E0" d="M7,3 C5.8954305,3 5,3.8954305 5,5 L5,6 L15,6 L15,5 C15,3.8954305 14.1045695,3 13,3 L7,3 Z" />
    <path fill="#D2D2D2" d="M7,3 L13,3 L12,1.5 L8,1.5 L7,3 Z" />
  </svg>
);

const WaterDropIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-blue-500">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.24 9.943A4.504 4.504 0 0110 6.002a4.504 4.504 0 012.76 3.94C12.198 11.508 11.192 13 10 13c-1.192 0-2.198-1.492-2.76-3.057z" clipRule="evenodd" />
  </svg>
);

const SaltIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-gray-500">
      <path d="M7 3.5A1.5 1.5 0 018.5 2h3A1.5 1.5 0 0113 3.5v2.086a2.5 2.5 0 010 .828V15.5a1 1 0 01-1 1h-4a1 1 0 01-1-1V6.414a2.5 2.5 0 010-.828V3.5z" />
      <path fillRule="evenodd" d="M3.5 7A1.5 1.5 0 002 8.5v5A1.5 1.5 0 003.5 15h13a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0016.5 7h-13zm10.5 3a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM9.5 10a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1a.5.5 0 00-.5-.5zm-4 0a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5z" clipRule="evenodd" />
    </svg>
  );

const SugarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-3">
    <path fill="#E3F2FD" d="M3.5,12 C3.5,15 6,17 10,17 C14,17 16.5,15 16.5,12 H3.5Z" />
    <path fill="#BBDEFB" d="M4.5,10 H15.5 C15.5,10.5 15,11 14.5,11 H5.5 C5,11 4.5,10.5 4.5,10Z" />
    <ellipse cx="10" cy="10.5" rx="4.5" ry="2.5" fill="#FFFFFF"/>
    <circle cx="9" cy="10" r="0.5" fill="#F0F0F0" />
    <circle cx="11" cy="10" r="0.5" fill="#F0F0F0" />
    <circle cx="10" cy="11" r="0.5" fill="#F0F0F0" />
    <circle cx="8" cy="11.2" r="0.4" fill="#F0F0F0" />
    <circle cx="12" cy="11.2" r="0.4" fill="#F0F0F0" />
  </svg>
);

const OilIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-3">
    <path fill="#FFC107" d="M7,18 H13 V10 C13,8.5 12,7 10,7 C8,7 7,8.5 7,10 V18 Z" />
    <path fill="#AED6F1" fillOpacity="0.5" d="M6,18.5 H14 V9 C14,7 12.5,5.5 10,5.5 C7.5,5.5 6,7 6,9 V18.5 Z" />
    <path fill="#7FB3D5" fillOpacity="0.6" d="M8.5,5.5 H11.5 V3.5 H8.5 V5.5 Z" />
    <rect x="8" y="2" width="4" height="1.5" fill="#5D6D7E" rx="0.5" />
  </svg>
);

const YeastIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-3">
    <rect x="4" y="7" width="12" height="6" fill="#8B5A2B" rx="1" />
    <path fill="#A07855" d="M4,7 L5,6 H15 L16,7 H4 Z M5,6 L4.5,7.2 H15.5 L15,6 H5 Z" />
    <path fill="#654321" d="M16,7 L15,6 V12 L16,13 V7 Z M15,12 L16,12.8 V7.2 L15,6 V12 Z" />
  </svg>
);

const BakingImproverIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-6 h-6 mr-3">
    <path fill="#B0BEC5" d="M3,12 C3,15 5.5,17 10,17 C14.5,17 17,15 17,12 H3Z" />
    <path fill="#CFD8DC" d="M4,10 H16 C16,10.5 15.5,11 15,11 H5 C4.5,11 4,10.5 4,10Z" />
    <ellipse cx="10" cy="10.5" rx="5" ry="2.5" fill="#FFFFFF"/>
    <path d="M6,11 C7,9.5 9,9 10,9 C11,9 13,9.5 14,11" stroke="#F0F0F0" fill="none" strokeWidth="0.5"/>
  </svg>
);

const MargarineIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-yellow-400">
    <path d="M4 6a2 2 0 012-2h8a2 2 0 012 2v2H4V6z" />
    <path fillRule="evenodd" d="M3 9h14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm2 2.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" clipRule="evenodd" />
  </svg>
);

const MilkPowderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-blue-100">
      <path fillRule="evenodd" d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a2 2 0 00-2 2v3a2 2 0 002 2h2.345A3.505 3.505 0 0110 15.5c.597 0 1.168-.149 1.655-.416H15a2 2 0 002-2V9a2 2 0 00-2-2H5zm0 1h10v3H5V8zm2.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
      <path d="M9 11.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" opacity="0.3"/>
    </svg>
  );

const PrimaPanIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-gray-400">
    <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v2h2a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h2V3zm2-1v2h6V2H7zm8 4H5v9h10V6z" clipRule="evenodd" />
    <path d="M8 8h4v2H8V8zm0 3h4v2H8v-2z" />
  </svg>
);

const KwasBasIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-yellow-600">
    <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v2h1a1 1 0 011 1v10a1 1 0 01-1 1H7a1 1 0 01-1-1V6a1 1 0 011-1h1V3z" />
    <path fillOpacity="0.3" d="M9 7h2v5H9V7z" />
    <rect x="7" y="2" width="6" height="1.5" rx="0.5" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);

const AromamaltIcon: React.FC = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-yellow-800">
    <path d="M7 2a1 1 0 00-1 1v1H5a1 1 0 00-1 1v10a2 2 0 002 2h8a2 2 0 002-2V5a1 1 0 00-1-1h-1V3a1 1 0 00-1-1H7zm1 5a2 2 0 114 0 2 2 0 01-4 0z" />
    <path fillOpacity="0.5" d="M8 7a2 2 0 114 0 2 2 0 01-4 0z" />
  </svg>
);

const CiabattaImproverIcon: React.FC = () => ( // Placeholder
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-green-500">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 2h10v6H5V6zm2 1h2v2H7V7zm4 0h2v2h-2V7z" clipRule="evenodd" />
    <text x="10" y="13" fontSize="6" fill="white" textAnchor="middle" dominantBaseline="middle">C</text>
  </svg>
);

const WbMixIcon: React.FC = () => ( // Placeholder
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-3 text-blue-500">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm1 2h10v6H5V6zm1.5 1.5h2v1h-2v-1zm3.5 0h2v1h-2v-1zm-3.5 2.5h2v1h-2v-1zm3.5 0h2v1h-2v-1z" clipRule="evenodd" />
    <text x="10" y="13" fontSize="5" fill="white" textAnchor="middle" dominantBaseline="middle">WB</text>
  </svg>
);


const iconMap: Record<string, React.FC> = {
  flour: BagOfFlourIcon,
  water: WaterDropIcon,
  salt: SaltIcon,
  sugar: SugarIcon,
  oil: OilIcon,
  yeast: YeastIcon,
  bakingImprover: BakingImproverIcon,
  margarine: MargarineIcon,
  milkPowder: MilkPowderIcon,
  bakingImproverRogal: BakingImproverIcon,
  flourWheat650: BagOfFlourIcon,
  flourRye2000: BagOfFlourIcon,
  primaPan: PrimaPanIcon,
  kwasBas: KwasBasIcon,
  aromamalt: AromamaltIcon,
  // Ciabatta specific ingredients
  flourWheat500_ciabatta: BagOfFlourIcon,
  ciabattaImprover: CiabattaImproverIcon,
  // Wiejska specific ingredients
  flourWheat500_wiejska: BagOfFlourIcon,
  flourRye580_wiejska: BagOfFlourIcon,
  wbMix: WbMixIcon,
};

const formatAmount = (originalAmount: number, originalUnit: string): { formattedAmount: string, formattedUnit: string } => {
  let displayAmount = originalAmount;
  let displayUnit = originalUnit;

  if (originalUnit === 'g') {
    displayAmount = originalAmount / 1000;
    displayUnit = 'kg';
  } else if (originalUnit === 'ml') {
    displayAmount = originalAmount / 1000;
    displayUnit = 'L';
  }

  let formattedAmountStr: string;

  if (displayUnit === 'kg' || displayUnit === 'L') {
    if (displayAmount === 0) {
      formattedAmountStr = "0.00";
    } else {
      const factor = 100; 
      const truncatedValue = Math.floor(displayAmount * factor) / factor;
      formattedAmountStr = truncatedValue.toFixed(2);
    }
  } else { 
    formattedAmountStr = displayAmount.toString(); 
  }

  return { formattedAmount: formattedAmountStr, formattedUnit: displayUnit };
};


type CalculatorId = typeof ROLL_CONFIG.id | typeof ROGAL_CONFIG.id | typeof RYE_FIT_CONFIG.id | typeof CIABATTA_CONFIG.id | typeof WIEJSKA_CONFIG.id;

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>(ROLL_CONFIG.id);
  
  const [rollQuantities, setRollQuantities] = useState<Record<string, string>>(ROLL_CONFIG.initialQuantities);
  const [rogalQuantities, setRogalQuantities] = useState<Record<string, string>>(ROGAL_CONFIG.initialQuantities);
  const [ryeFitQuantities, setRyeFitQuantities] = useState<Record<string, string>>(RYE_FIT_CONFIG.initialQuantities);
  const [ciabattaQuantities, setCiabattaQuantities] = useState<Record<string, string>>(CIABATTA_CONFIG.initialQuantities);
  const [wiejskaQuantities, setWiejskaQuantities] = useState<Record<string, string>>(WIEJSKA_CONFIG.initialQuantities);
    
  const [calculatedIngredients, setCalculatedIngredients] = useState<CalculatedIngredient[] | null>(null);
  const [totalCalculatedFlour, setTotalCalculatedFlour] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null);

  const currentConfig = CALCULATOR_CONFIGS[activeCalculator];
  
  const getCurrentQuantities = () => {
    switch (activeCalculator) {
      case ROLL_CONFIG.id: return rollQuantities;
      case ROGAL_CONFIG.id: return rogalQuantities;
      case RYE_FIT_CONFIG.id: return ryeFitQuantities;
      case CIABATTA_CONFIG.id: return ciabattaQuantities;
      case WIEJSKA_CONFIG.id: return wiejskaQuantities;
      default: return {};
    }
  };
  const currentQuantities = getCurrentQuantities();

  const setCurrentQuantities = (updater: React.SetStateAction<Record<string, string>>) => {
    switch (activeCalculator) {
      case ROLL_CONFIG.id: setRollQuantities(updater); break;
      case ROGAL_CONFIG.id: setRogalQuantities(updater); break;
      case RYE_FIT_CONFIG.id: setRyeFitQuantities(updater); break;
      case CIABATTA_CONFIG.id: setCiabattaQuantities(updater); break;
      case WIEJSKA_CONFIG.id: setWiejskaQuantities(updater); break;
    }
  };

  const handleQuantityChange = (productTypeId: string, value: string) => {
    setCurrentQuantities(prev => ({
      ...prev,
      [productTypeId]: value,
    }));
  };

  const handleCalculate = useCallback(() => {
    let totalDesiredFinalProductWeight = 0;
    const config = CALCULATOR_CONFIGS[activeCalculator];
    const quantities = getCurrentQuantities();

    for (const productType of config.types) {
      const quantityStr = quantities[productType.id];
      const quantity = parseInt(quantityStr, 10);

      if (!isNaN(quantity) && quantity >= 0) { 
        totalDesiredFinalProductWeight += quantity * productType.finalWeightGrams;
      }
    }
    
    setError(null); 

    const totalFlourRequired = totalDesiredFinalProductWeight / config.yieldFactor;
    setTotalCalculatedFlour(totalFlourRequired);

    const newIngredients = config.ingredients.map(ingredient => {
      const ratioToBaseFlourSum = ingredient.baseAmount / config.baseFlourReferenceAmount;
      const calculatedAmount = ratioToBaseFlourSum * totalFlourRequired;
      
      return {
        ...ingredient,
        amount: calculatedAmount,
      };
    });
    setCalculatedIngredients(newIngredients);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCalculator, rollQuantities, rogalQuantities, ryeFitQuantities, ciabattaQuantities, wiejskaQuantities]); 

  useEffect(() => {
    handleCalculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCalculator]); 


  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-white font-[sans-serif]">
      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-xl transform transition-all duration-300 ease-out hover:shadow-amber-300/50 hover:scale-[1.005]">
        <header className="mb-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-700 tracking-tight">
            Kalkulator Wypieków
          </h1>
          <p className="text-gray-600 mt-2 text-2xl md:text-3xl">
            Oblicz składniki na idealne Wypieki piekarni Brzeźno
          </p>
        </header>

        <nav className="mb-8 flex flex-wrap justify-center border-b border-gray-200">
          {(Object.values(CALCULATOR_CONFIGS) as CalculatorConfig[]).map(config => (
            <button
              key={config.id}
              onClick={() => setActiveCalculator(config.id as CalculatorId)}
              className={`px-3 sm:px-4 py-3 text-lg sm:text-xl md:text-2xl font-semibold transition-colors duration-150 ease-in-out focus:outline-none whitespace-nowrap
                ${activeCalculator === config.id 
                  ? 'border-b-2 border-amber-600 text-amber-600' 
                  : 'text-gray-500 hover:text-amber-500 hover:border-b-2 hover:border-amber-300'}`}
              aria-current={activeCalculator === config.id ? 'page' : undefined}
            >
              {config.name}
            </button>
          ))}
        </nav>

        <section aria-labelledby={`${currentConfig.id}-selection-heading`} className="mb-8">
          <h2 id={`${currentConfig.id}-selection-heading`} className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Wybierz rodzaje i ilości ({currentConfig.name.toLowerCase()}):
          </h2>
          <div className="space-y-4">
            {currentConfig.types.map((productType: RollType) => (
              <div key={productType.id} className="flex items-center justify-between gap-x-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                <label htmlFor={`qty_${currentConfig.id}_${productType.id}`} className="text-xl md:text-2xl text-gray-700 flex-1">
                  {productType.displayName}:
                </label>
                <input
                  type="number"
                  id={`qty_${currentConfig.id}_${productType.id}`}
                  value={currentQuantities[productType.id]}
                  onChange={(e) => handleQuantityChange(productType.id, e.target.value)}
                  onKeyPress={handleEnterPress}
                  min="0"
                  className="w-28 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xl md:text-2xl text-center transition-shadow duration-150"
                  placeholder="0"
                  aria-label={`Ilość dla ${productType.name}`}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8 text-center">
          <button
            onClick={handleCalculate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 active:scale-95 text-xl md:text-2xl"
          >
            Oblicz Składniki
          </button>
        </div>
        {error && <p id="error-message" role="alert" className="text-red-600 mt-3 text-xl bg-red-100 p-3 rounded-md shadow-sm text-center">{error}</p>}

        {calculatedIngredients && !error && (
          <section aria-labelledby="ingredients-heading">
            {totalCalculatedFlour >= 0 && calculatedIngredients && ( 
              <div className="text-xl md:text-2xl text-amber-800 my-6 p-3 bg-amber-100 rounded-lg shadow text-center">
                Łączna potrzebna ilość mąki: <span className="font-bold">{formatAmount(totalCalculatedFlour, 'g').formattedAmount} {formatAmount(totalCalculatedFlour, 'g').formattedUnit}</span>
              </div>
            )}
            <h2 id="ingredients-heading" className="text-2xl md:text-3xl font-semibold text-amber-700 mb-6 border-b-2 border-amber-200 pb-3">
              Potrzebne składniki:
            </h2>
            <ul className="space-y-3">
              {calculatedIngredients.map((ingredient) => {
                const IconComponent = iconMap[ingredient.id];
                const { formattedAmount, formattedUnit } = formatAmount(ingredient.amount, ingredient.unit);
                return (
                  <li 
                    key={ingredient.id} 
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-200 ease-out"
                  >
                    <div className="flex items-center">
                      {IconComponent && <IconComponent />}
                      <span className="text-gray-800 text-xl md:text-2xl">{ingredient.name}</span>
                    </div>
                    <span className="text-xl md:text-2xl font-semibold text-amber-700 tabular-nums">
                      {formattedAmount} {formattedUnit}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-lg md:text-xl text-gray-500 text-center">
              Pamiętaj, że to są ilości orientacyjne. Smacznego pieczenia! 🥖
            </p>
          </section>
        )}
      </div>
       <footer className="mt-10 text-center text-md md:text-lg text-amber-800/70">
        <p>&copy; 2025 Kalkulator Wypieków. Stworzone z pasją do pieczenia. Krzysztof S.</p>
      </footer>
    </div>
  );
}

export default App;
