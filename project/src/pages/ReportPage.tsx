import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchX, HandHeart, Upload, Check, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, LOCATIONS } from '@/types';

export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useApp();

  const [reportType, setReportType] = useState<'lost' | 'found'>(
    (searchParams.get('type') as 'lost' | 'found') || 'lost'
  );
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const placeholderImages = [
    'https://images.pexels.com/photos/6633804/pexels-photo-6633804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/67094/pexels-photo-67094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/1591/technology-music-sound-things.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageUrls((prev) => [...prev, ...newUrls].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Item name is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.category) errs.category = 'Please select a category';
    if (!formData.location) errs.location = 'Please select a location';
    if (!formData.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalImages = imageUrls.length > 0 ? imageUrls : [placeholderImages[0]];

    addItem({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      type: reportType,
      status: 'active',
      date: formData.date,
      location: formData.location,
      images: finalImages,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-cream-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6 animate-scaleIn">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-charcoal-800">Report Submitted!</h1>
          <p className="text-charcoal-400 mt-3">
            Your {reportType} item report has been posted. Other students can now see it and reach
            out if they have information.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/browse')}
              className="px-6 py-3 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-colors"
            >
              Browse Items
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  description: '',
                  category: '',
                  date: new Date().toISOString().split('T')[0],
                  location: '',
                });
                setImageUrls([]);
              }}
              className="px-6 py-3 bg-white text-charcoal-600 font-medium rounded-xl border border-charcoal-100 hover:border-sand-300 transition-colors"
            >
              Report Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-charcoal-400 hover:text-sand-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="font-display text-4xl font-semibold text-charcoal-800">Report an Item</h1>
        <p className="text-charcoal-400 mt-2">
          Provide details about the item you lost or found to help reunite it with its owner.
        </p>

        {/* Type Selector */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => setReportType('lost')}
            className={`flex items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
              reportType === 'lost'
                ? 'border-charcoal-800 bg-white shadow-md'
                : 'border-charcoal-100 bg-white/50 hover:border-sand-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              reportType === 'lost' ? 'bg-charcoal-800 text-cream-50' : 'bg-cream-200 text-charcoal-400'
            }`}>
              <SearchX className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-charcoal-800">I Lost Something</div>
              <div className="text-xs text-charcoal-400">Report a lost item</div>
            </div>
          </button>
          <button
            onClick={() => setReportType('found')}
            className={`flex items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
              reportType === 'found'
                ? 'border-sand-500 bg-white shadow-md'
                : 'border-charcoal-100 bg-white/50 hover:border-sand-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              reportType === 'found' ? 'bg-sand-600 text-cream-50' : 'bg-cream-200 text-charcoal-400'
            }`}>
              <HandHeart className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-charcoal-800">I Found Something</div>
              <div className="text-xs text-charcoal-400">Report a found item</div>
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 bg-white border border-charcoal-100 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Brown leather wallet"
              className={`w-full px-4 py-3 bg-cream-50 border rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none transition-colors ${
                errors.name ? 'border-red-300 focus:border-red-400' : 'border-charcoal-100 focus:border-sand-400'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the item in detail — color, brand, distinguishing features, contents, etc."
              rows={4}
              className={`w-full px-4 py-3 bg-cream-50 border rounded-xl text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none transition-colors resize-none ${
                errors.description ? 'border-red-300 focus:border-red-400' : 'border-charcoal-100 focus:border-sand-400'
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 bg-cream-50 border rounded-xl text-sm text-charcoal-700 focus:outline-none transition-colors ${
                  errors.category ? 'border-red-300 focus:border-red-400' : 'border-charcoal-100 focus:border-sand-400'
                }`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-600 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-4 py-3 bg-cream-50 border rounded-xl text-sm text-charcoal-700 focus:outline-none transition-colors ${
                  errors.location ? 'border-red-300 focus:border-red-400' : 'border-charcoal-100 focus:border-sand-400'
                }`}
              >
                <option value="">Select a location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full sm:w-auto px-4 py-3 bg-cream-50 border rounded-xl text-sm text-charcoal-700 focus:outline-none transition-colors ${
                errors.date ? 'border-red-300 focus:border-red-400' : 'border-charcoal-100 focus:border-sand-400'
              }`}
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-charcoal-600 mb-2">
              Item Images
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {imageUrls.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-charcoal-100 group">
                  <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              {imageUrls.length < 5 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-charcoal-200 hover:border-sand-400 flex flex-col items-center justify-center cursor-pointer transition-colors bg-cream-50">
                  <Upload className="w-6 h-6 text-charcoal-300 mb-1" />
                  <span className="text-xs text-charcoal-400">Upload</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <p className="text-xs text-charcoal-400 mt-2 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" />
              Upload up to 5 photos. A placeholder will be used if none are provided.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 font-medium rounded-xl transition-all hover:scale-[1.01] ${
                reportType === 'lost'
                  ? 'bg-charcoal-800 text-cream-50 hover:bg-charcoal-700'
                  : 'bg-sand-600 text-cream-50 hover:bg-sand-500'
              }`}
            >
              {reportType === 'lost' ? <SearchX className="w-5 h-5" /> : <HandHeart className="w-5 h-5" />}
              Submit {reportType === 'lost' ? 'Lost' : 'Found'} Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
