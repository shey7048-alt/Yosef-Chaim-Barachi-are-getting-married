import React, { useState, useEffect } from 'react';
import { Image, Upload, Trash2, Sliders } from 'lucide-react';

interface BackgroundOverlayProps {
  children: React.ReactNode;
}

export default function BackgroundOverlay({ children }: BackgroundOverlayProps) {
  // Try to load any previously uploaded preview background from localStorage
  const [bgImage, setBgImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('wedding_bg_image') || null;
    } catch {
      return null;
    }
  });

  const [overlayOpacity, setOverlayOpacity] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('wedding_bg_opacity');
      return stored ? parseFloat(stored) : 0.4;
    } catch {
      return 0.4;
    }
  });

  const [blurAmount, setBlurAmount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('wedding_bg_blur');
      return stored ? parseFloat(stored) : 2;
    } catch {
      return 2;
    }
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_bg_opacity', overlayOpacity.toString());
      localStorage.setItem('wedding_bg_blur', blurAmount.toString());
    } catch (e) {
      console.error(e);
    }
  }, [overlayOpacity, blurAmount]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          localStorage.setItem('wedding_bg_image', base64String);
          setBgImage(base64String);
        } catch (error) {
          alert('The uploaded image is too large for browser storage. Try a smaller size, compressed image, or previewing in the browser.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    try {
      localStorage.removeItem('wedding_bg_image');
      setBgImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  // Modern floral watercolor background SVG/Gradient as a high-quality wedding default placeholder
  const defaultBackgroundStyle = {
    backgroundImage: `radial-gradient(circle at top right, rgba(238, 216, 171, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at bottom left, rgba(200, 157, 85, 0.25) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(254, 252, 248, 1) 0%, rgba(251, 246, 234, 0.95) 100%)`,
  };

  return (
    <div className="relative min-h-screen champagne-gradient transition-all duration-700 ease-in-out">
      {/* Background layer: Either custom uploaded image or elegant fallback */}
      {bgImage ? (
        <div 
          className="fixed inset-0 bg-cover bg-center transition-all duration-500 z-0" 
          style={{ 
            backgroundImage: `url(${bgImage})`,
            filter: `blur(${blurAmount}px)`
          }}
        />
      ) : (
        <div 
          className="fixed inset-0 bg-cover bg-center transition-all duration-500 z-0" 
          style={{
            ...defaultBackgroundStyle,
            filter: `blur(${blurAmount}px)`
          }}
        />
      )}

      {/* Decorative floral watermark patterns underneath the main UI (makes placeholder look beautiful immediately) */}
      {!bgImage && (
        <div className="fixed inset-0 pointer-events-none opacity-10 select-none z-0 overflow-hidden">
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.727l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.041.02a.75.75 0 11-1.063-.852zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 14.25a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
          </svg>
        </div>
      )}

      {/* Color overlay layer to assure text contrast */}
      <div 
        className="fixed inset-0 bg-[#fbf9f5] transition-all duration-500 z-0"
        style={{ opacity: bgImage ? overlayOpacity : 0.1 }}
      />

      {/* Persistent Background Customizer Drawer / Toggle (Elegantly presented for the developer or user) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="luxury-glass flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-xs font-medium text-gold-900 hover:text-gold-950 hover:border-gold-400 hover:scale-105 transition-all duration-300 pointer-events-auto"
          aria-label="Customize Background"
          id="bg-settings-toggle"
        >
          <Sliders className="w-3.5 h-3.5 animate-pulse text-gold-600" />
          <span>{bgImage ? 'Edit Background' : 'Upload Background'}</span>
        </button>

        {showSettings && (
          <div className="absolute bottom-14 right-0 w-80 p-5 rounded-2xl shadow-xl luxury-glass border border-gold-200/40 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gold-200/20">
              <h4 className="font-serif text-base text-gold-950 font-semibold">Background Settings</h4>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-xs text-stone-400 hover:text-stone-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Wedding Background Image
                </label>
                {bgImage ? (
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg overflow-hidden relative border border-gold-200">
                      <img src={bgImage} alt="Preview background" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200">
                        <button 
                          onClick={clearImage}
                          className="p-1 px-2.5 bg-red-600 text-white rounded text-xs flex items-center gap-1"
                          id="delete-bg-btn"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={clearImage}
                      className="w-full py-1.5 text-xs border border-red-200 hover:border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Custom Background
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gold-300 hover:border-gold-500 rounded-xl cursor-pointer bg-gold-50/50 hover:bg-gold-50/80 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                      <Upload className="w-6 h-6 text-gold-500 mb-1" />
                      <p className="text-[11px] text-stone-500 font-medium">Click to upload background</p>
                      <p className="text-[9px] text-stone-400 mt-0.5">JPG & PNG (Max 1MB inside LocalStorage)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                    />
                  </label>
                )}
              </div>

              {bgImage && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Overlay Dimming:</span>
                      <span className="font-mono">{Math.round(overlayOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.0" 
                      max="0.8" 
                      step="0.05"
                      value={overlayOpacity} 
                      onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                      className="w-full accent-gold-600 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                      id="bg-opacity-slider"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Blur Effect:</span>
                      <span className="font-mono">{blurAmount}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="12" 
                      step="1"
                      value={blurAmount} 
                      onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                      className="w-full accent-gold-600 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer"
                      id="bg-blur-slider"
                    />
                  </div>
                </>
              )}

              <div className="text-[10px] text-stone-400 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="font-semibold text-gold-800">Note: </span>
                Any background you upload here will be saved on your device's web browser, so you can test and perfect the design before copying over files!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content App Shell */}
      <div className="relative z-10 w-full select-text pb-20">
        {children}
      </div>
    </div>
  );
}
