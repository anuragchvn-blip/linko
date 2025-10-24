'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProfilePictureUpload from './ProfilePictureUpload';

interface ProfileEditorProps {
  initialData: any;
  onSave: (data: any) => void;
}

export default function ProfileEditor({ initialData, onSave }: ProfileEditorProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatarUrl || '');
  const [interests, setInterests] = useState<string[]>(initialData?.interests || []);
  const [interestInput, setInterestInput] = useState('');
  const [links, setLinks] = useState(initialData?.links || []);
  const [dapps, setDapps] = useState(initialData?.dapps || []);
  const [spotifyEmbed, setSpotifyEmbed] = useState(initialData?.spotifyEmbed || '');

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addLink = () => {
    setLinks([...links, { title: '', url: '', icon: '🔗' }]);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_: any, i: number) => i !== index));
  };

  const addDApp = () => {
    setDapps([...dapps, { name: '', url: '', icon: '🚀', category: 'DApp', verified: false }]);
  };

  const updateDApp = (index: number, field: string, value: string | boolean) => {
    const newDApps = [...dapps];
    newDApps[index] = { ...newDApps[index], [field]: value };
    setDapps(newDApps);
  };

  const removeDApp = (index: number) => {
    setDapps(dapps.filter((_: any, i: number) => i !== index));
  };

  const verifyDApp = async (index: number) => {
    const dapp = dapps[index];
    const isDApp = 
      dapp.url.includes('app.') || 
      dapp.url.includes('swap') || 
      dapp.url.includes('dex') ||
      dapp.url.includes('.fi') ||
      dapp.url.includes('defi') ||
      dapp.url.includes('protocol');
    
    updateDApp(index, 'verified', isDApp);
  };

  const handleSave = () => {
    onSave({ name, bio, avatarUrl, interests, links, dapps, spotifyEmbed });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 space-y-4 sm:space-y-6"
    >
      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Edit Profile</h3>

      {/* Profile Picture */}
      <ProfilePictureUpload 
        currentImage={avatarUrl}
        onImageChange={setAvatarUrl}
      />

      {/* Name */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
          rows={3}
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Interests & Tags 🏷️
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Add interests to connect with like-minded people!
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="e.g., DeFi, NFTs, Gaming, Art"
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            onClick={addInterest}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-xl hover:bg-accent transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
          >
            Add
          </button>
        </div>
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 hover:bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-xs sm:text-sm font-semibold text-gray-900">
            Custom Links
          </label>
          <button
            onClick={addLink}
            className="text-primary hover:text-accent transition-colors text-xs sm:text-sm font-medium"
          >
            + Add Link
          </button>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {links.map((link: any, index: number) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={link.icon}
                onChange={(e) => updateLink(index, 'icon', e.target.value)}
                placeholder="🔗"
                className="w-full sm:w-16 px-3 py-2 text-sm border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="text"
                value={link.title}
                onChange={(e) => updateLink(index, 'title', e.target.value)}
                placeholder="Link Title"
                className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={() => removeLink(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DApps */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-xs sm:text-sm font-semibold text-gray-900">
            Web3 Projects / DApps
          </label>
          <button
            onClick={addDApp}
            className="text-primary hover:text-accent transition-colors text-xs sm:text-sm font-medium"
          >
            + Add Project
          </button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {dapps.map((dapp: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={dapp.icon}
                  onChange={(e) => updateDApp(index, 'icon', e.target.value)}
                  placeholder="🚀"
                  className="w-full sm:w-16 px-3 py-2 text-sm border border-gray-300 rounded-xl text-center focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  value={dapp.name}
                  onChange={(e) => updateDApp(index, 'name', e.target.value)}
                  placeholder="Project Name"
                  className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => removeDApp(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm sm:w-auto"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={dapp.url}
                  onChange={(e) => updateDApp(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="text"
                  value={dapp.category}
                  onChange={(e) => updateDApp(index, 'category', e.target.value)}
                  placeholder="Category (e.g., DeFi, NFT)"
                  className="w-full sm:w-40 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => verifyDApp(index)}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors text-sm whitespace-nowrap ${
                    dapp.verified
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {dapp.verified ? '✓ Verified' : 'Verify'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify Embed */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Spotify Embed (Optional)
        </label>
        <input
          type="text"
          value={spotifyEmbed}
          onChange={(e) => setSpotifyEmbed(e.target.value)}
          placeholder="Spotify track URL"
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Save Button */}
      <div className="flex gap-3 pt-4">
        <button 
          onClick={handleSave} 
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
        >
          Save Profile ✨
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Changes are saved locally and synced with your wallet address
      </p>
    </motion.div>
  );
}
