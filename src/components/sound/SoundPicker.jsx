// src/components/sound/SoundPicker.jsx
import React, { useState } from "react";
import { 
  Volume2, 
  Play, 
  Pause, 
  Check, 
  Upload, 
  Trash2,
  Music,
  Bell,
  Plus,
  File,
  X,
  AlertCircle
} from "lucide-react";
import { useSound } from "../../contexts/SoundContext";
import VolumeControl from "./VolumeControl";

const SoundPicker = ({ 
  type = "alarm",
  selectedSound,
  onSelect,
  showUpload = true,
  showVolumeControl = true,
  className = "",
}) => {
  const { 
    alarmSounds, 
    timerSounds,
    customSounds,
    previewingSound, 
    previewSound, 
    stopPreview,
    addCustomSound,
    deleteCustomSound,
    getCustomSoundsCount,
    settings,
    updateSettings,
  } = useSound();

  const [showUploader, setShowUploader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [customName, setCustomName] = useState("");

  const sounds = type === "alarm" ? alarmSounds : timerSounds;
  const volumeKey = type === "alarm" ? "alarmVolume" : "timerVolume";
  const customCount = getCustomSoundsCount(type);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const customSound = await addCustomSound(file, type, customName.trim() || undefined);
      
      setUploadSuccess(`"${customSound.name}" added successfully!`);
      setCustomName("");
      
      // Auto-select the new sound
      onSelect?.(customSound.id);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(null);
      }, 3000);
      
      // Reset file input
      e.target.value = "";
      
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle preview
  const handlePreview = (soundId) => {
    if (previewingSound === soundId) {
      stopPreview();
    } else {
      previewSound(soundId);
    }
  };

  // Handle select
  const handleSelect = (soundId) => {
    onSelect?.(soundId);
    if (type === "alarm") {
      updateSettings({ alarmSound: soundId });
    } else {
      updateSettings({ timerSound: soundId });
    }
  };

  // Handle delete
  const handleDelete = (soundId, soundName) => {
    if (confirm(`Delete "${soundName}"? This cannot be undone.`)) {
      deleteCustomSound(soundId);
    }
  };

  // Separate built-in and custom sounds
  const builtInSounds = sounds.filter(s => !s.isCustom);
  const customSoundsList = sounds.filter(s => s.isCustom);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === "alarm" ? (
            <Bell className="w-5 h-5 text-blue-400" />
          ) : (
            <Music className="w-5 h-5 text-blue-400" />
          )}
          <h3 className="font-bold text-white dark:text-gray-900">
            {type === "alarm" ? "Alarm Sounds" : "Timer Sounds"}
          </h3>
          <span className="text-xs text-slate-500 bg-slate-700 dark:bg-gray-200 px-2 py-0.5 rounded-full">
            {sounds.length} sounds
          </span>
        </div>
        
        {showUpload && (
          <button
            onClick={() => setShowUploader(!showUploader)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              showUploader 
                ? "bg-blue-600 text-white" 
                : "bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-700 hover:bg-slate-600 dark:hover:bg-gray-300"
            }`}
          >
            {showUploader ? (
              <>
                <X className="w-4 h-4" />
                Close
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Custom
              </>
            )}
          </button>
        )}
      </div>

      {/* Volume Control */}
      {showVolumeControl && (
        <VolumeControl
          value={settings[volumeKey]}
          onChange={(value) => updateSettings({ [volumeKey]: value })}
          label="Volume"
        />
      )}

      {/* Upload Section */}
      {showUploader && (
        <div className="p-4 bg-slate-800/50 dark:bg-gray-100 rounded-xl border border-slate-700 dark:border-gray-300 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-5 h-5 text-blue-400" />
            <p className="font-medium text-white dark:text-gray-900">
              Upload Custom Sound
            </p>
          </div>

          {/* Custom Name Input */}
          <div>
            <label className="block text-sm text-slate-400 dark:text-gray-500 mb-1">
              Sound Name (optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g., My Alarm"
              className="w-full px-3 py-2 bg-slate-900/50 dark:bg-white border border-slate-600 dark:border-gray-300 rounded-lg text-white dark:text-gray-900 placeholder-slate-500 focus:border-blue-500 outline-none"
              maxLength={30}
            />
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id={`sound-upload-${type}`}
            />
            <label
              htmlFor={`sound-upload-${type}`}
              className={`flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 transition-colors ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <File className="w-4 h-4" />
              {uploading ? "Uploading..." : "Choose Audio File"}
            </label>
            <span className="text-xs text-slate-500">
              MP3, WAV, OGG (max 5MB)
            </span>
          </div>

          {/* Success Message */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-sm">{uploadSuccess}</span>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{uploadError}</span>
            </div>
          )}

          {/* Custom Sounds Count */}
          <p className="text-xs text-slate-500">
            You have {customCount} custom {type} sound{customCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Custom Sounds Section */}
      {customSoundsList.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              Your Custom Sounds ({customSoundsList.length})
            </p>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {customSoundsList.map((sound) => (
              <SoundItem
                key={sound.id}
                sound={sound}
                isSelected={
                  selectedSound === sound.id ||
                  (type === "alarm" ? settings.alarmSound : settings.timerSound) === sound.id
                }
                isPreviewing={previewingSound === sound.id}
                onSelect={() => handleSelect(sound.id)}
                onPreview={() => handlePreview(sound.id)}
                onDelete={() => handleDelete(sound.id, sound.name)}
                showDelete={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Built-in Sounds Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Built-in Sounds ({builtInSounds.length})
        </p>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {builtInSounds.map((sound) => (
            <SoundItem
              key={sound.id}
              sound={sound}
              isSelected={
                selectedSound === sound.id ||
                (type === "alarm" ? settings.alarmSound : settings.timerSound) === sound.id
              }
              isPreviewing={previewingSound === sound.id}
              onSelect={() => handleSelect(sound.id)}
              onPreview={() => handlePreview(sound.id)}
              showDelete={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sound Item Component
const SoundItem = ({ 
  sound, 
  isSelected, 
  isPreviewing, 
  onSelect, 
  onPreview, 
  onDelete, 
  showDelete 
}) => {
  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
        isSelected
          ? "bg-blue-600/20 border border-blue-500"
          : sound.isCustom
          ? "bg-purple-900/20 dark:bg-purple-100/50 border border-purple-500/30 hover:border-purple-500"
          : "bg-slate-800/50 dark:bg-gray-100 border border-transparent hover:border-slate-600 dark:hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className={`p-2 rounded-full transition-colors ${
            isPreviewing
              ? "bg-blue-600 text-white"
              : "bg-slate-700 dark:bg-gray-200 text-slate-300 dark:text-gray-600 hover:bg-slate-600 dark:hover:bg-gray-300"
          }`}
        >
          {isPreviewing ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        {/* Sound Info */}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-white dark:text-gray-900">
              {sound.name}
            </p>
            {sound.isCustom && (
              <span className="px-2 py-0.5 text-[10px] bg-purple-500/30 text-purple-300 rounded-full uppercase tracking-wider">
                Custom
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-gray-500">
            {sound.description}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isSelected && (
          <div className="p-1.5 bg-blue-600 rounded-full">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        {showDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
            title="Delete sound"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SoundPicker);