import React, { useState } from 'react';
import Image from 'next/image';
import { useCombo } from '@/hooks/useCombo';

const PopcornCombo = ({ onContinue, selectedCombos }) => {
  const { data: combos } = useCombo()

  const getComboQuantity = (comboId) => {
    const selectedCombo = selectedCombos.find(c => c.id === comboId);
    return selectedCombo ? selectedCombo.quantity : 0;
  };

  const handleQuantityChange = (combo, newQuantity) => {
    onContinue(combo, newQuantity);
  };

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-lg font-bold mb-6">Select Your Popcorn Combo</h2>
      <div className="space-y-4">
        {combos?.body?.map((combo) => {
          const quantity = getComboQuantity(combo.id);
          return (
            <div
              key={combo.id}
              className={`p-4 rounded-lg secondary-button`}
              style={{
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '20px',
                cursor:'default',
                '&:hover': {
                  cursor: 'default',
                },
              }}
            >
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={combo.banner_url}
                    alt={combo.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{combo.name}</h3>
                    <p className="font-bold text-primary">{combo.price.toLocaleString()} VND</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4" style={{
                    textAlign: 'left',
                  }}>{combo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(combo, Math.max(0, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-border cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(combo, quantity + 1)} 
                        className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-border cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopcornCombo; 