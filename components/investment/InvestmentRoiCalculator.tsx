'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatNaira } from '@/lib/format';

export default function InvestmentRoiCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(150000000); // 150m NGN default
  const [rentalYieldPercent, setRentalYieldPercent] = useState<number>(7.5); // 7.5% annual yield
  const [appreciationPercent, setAppreciationPercent] = useState<number>(12); // 12% annual capital growth

  // Calculations
  const annualRentalIncome = (purchasePrice * rentalYieldPercent) / 100;
  const fiveYearRentalCumulative = annualRentalIncome * 5;
  const projectedValueYear5 = purchasePrice * Math.pow(1 + appreciationPercent / 100, 5);
  const capitalGain = projectedValueYear5 - purchasePrice;
  const totalReturn5Year = capitalGain + fiveYearRentalCumulative;
  const netRoiPercent = ((totalReturn5Year / purchasePrice) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-[#173F32]/15 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded bg-[#FAF8F2] flex items-center justify-center text-[#173F32] border border-[#173F32]/10">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#173F32]">
            Nigerian Real Estate Yield & Capital ROI Simulator
          </h3>
          <p className="text-xs text-[#5C6E66]">
            Estimate 5-year combined capital growth and gross rental income.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="inv-purchase" className="font-semibold text-[#26342F]">
                Acquisition Price (₦)
              </label>
              <span className="font-mono font-bold text-[#173F32]">{formatNaira(purchasePrice)}</span>
            </div>
            <input
              id="inv-purchase"
              type="range"
              min={30000000}
              max={1500000000}
              step={10000000}
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full accent-[#173F32] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5C6E66] mt-1 font-mono">
              <span>₦30M</span>
              <span>₦500M</span>
              <span>₦1.5B</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="inv-yield" className="font-semibold text-[#26342F]">
                Estimated Annual Rental Yield
              </label>
              <span className="font-mono font-bold text-[#173F32]">{rentalYieldPercent}% / year</span>
            </div>
            <input
              id="inv-yield"
              type="range"
              min={4}
              max={14}
              step={0.5}
              value={rentalYieldPercent}
              onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
              className="w-full accent-[#173F32] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5C6E66] mt-1">
              <span>4% (Prime Land/Villa)</span>
              <span>7.5% (Typical Duplex)</span>
              <span>14% (Serviced Shortlets)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="inv-appreciation" className="font-semibold text-[#26342F]">
                Projected Annual Capital Appreciation
              </label>
              <span className="font-mono font-bold text-[#173F32]">{appreciationPercent}% / year</span>
            </div>
            <input
              id="inv-appreciation"
              type="range"
              min={5}
              max={25}
              step={1}
              value={appreciationPercent}
              onChange={(e) => setAppreciationPercent(Number(e.target.value))}
              className="w-full accent-[#173F32] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#5C6E66] mt-1">
              <span>5% (Mature Enclaves)</span>
              <span>12% (Lekki Phase 1)</span>
              <span>25% (Rapid Growth Corridor)</span>
            </div>
          </div>
        </div>

        {/* Projection Outcome Panel */}
        <div className="lg:col-span-6 bg-[#FAF8F2] p-6 rounded-xl border border-[#173F32]/12 space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-[#173F32] pb-2 border-b border-[#173F32]/10">
            5-Year Investment Projections
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C6E66]">Estimated Annual Gross Rent:</span>
              <span className="font-mono font-bold text-[#26342F]">{formatNaira(annualRentalIncome)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C6E66]">5-Year Cumulative Rental Income:</span>
              <span className="font-mono font-bold text-[#26342F]">{formatNaira(fiveYearRentalCumulative)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5C6E66]">Projected Asset Value (Year 5):</span>
              <span className="font-mono font-bold text-[#173F32]">{formatNaira(projectedValueYear5)}</span>
            </div>

            <div className="pt-3 border-t border-[#173F32]/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#173F32]">Total 5-Year Net Growth:</span>
              <span className="text-sm font-bold font-mono text-[#173F32]">
                +{formatNaira(totalReturn5Year)} ({netRoiPercent}%)
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#5C6E66] leading-relaxed pt-2">
            *Simulation for illustrative investment analysis. Actual returns depend on corridor tenancy demand,
            inflation hedges, and maintenance disciplines. Connect with our advisory desk for specific property
            pro-forma spreadsheets.
          </p>

          <a
            href={`https://wa.me/2347089581351?text=${encodeURIComponent(
              `Hello Majesty Realty, I ran an investment simulation for a ${formatNaira(
                purchasePrice
              )} property and would like to review actual high-yield opportunities.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded text-center block transition-colors"
          >
            Review Curated Investment Assets
          </a>
        </div>
      </div>
    </div>
  );
}
