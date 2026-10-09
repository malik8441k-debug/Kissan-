/**
 * STORAGE SERVICE MODULE
 * Provides local persistent storage (localStorage) for:
 * 1. Selected app language
 * 2. Farm diary records (CRUD operations)
 * 3. Seed demo records if storage is clean
 */

const STORAGE_KEYS = {
  LANGUAGE: "kisan_guidance_lang",
  RECORDS: "kisan_farm_records",
  DEVICE_VIEW: "kisan_device_view"
};

class StorageService {
  constructor() {
    this.initDefaultRecords();
  }

  // Language Preference
  getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'hi'; // Default to Hindi for pilot
  }

  setLanguage(langCode) {
    if (['en', 'hi', 'mr'].includes(langCode)) {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, langCode);
    }
  }

  // Device Frame View Preference ('mobile' vs 'fullscreen')
  getDeviceView() {
    return localStorage.getItem(STORAGE_KEYS.DEVICE_VIEW) || 'mobile';
  }

  setDeviceView(viewMode) {
    localStorage.setItem(STORAGE_KEYS.DEVICE_VIEW, viewMode);
  }

  // Farm Records Management
  initDefaultRecords() {
    const existing = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (!existing) {
      if (typeof INITIAL_SAMPLE_FARM_RECORDS !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_SAMPLE_FARM_RECORDS));
      } else {
        localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify([]));
      }
    }
  }

  getAllRecords() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error reading farm records:", err);
      return [];
    }
  }

  getRecordById(recordId) {
    const records = this.getAllRecords();
    return records.find(r => r.id === recordId) || null;
  }

  saveRecord(record) {
    const records = this.getAllRecords();
    const existingIndex = records.findIndex(r => r.id === record.id);

    // Calculate totals automatically
    const totalExpense = Number(record.costs?.seed || 0) +
      Number(record.costs?.fertilizer || 0) +
      Number(record.costs?.labor || 0) +
      Number(record.costs?.irrigation || 0) +
      Number(record.costs?.protection || 0) +
      Number(record.costs?.machinery || 0) +
      Number(record.costs?.transport || 0);

    const totalSales = Number(record.harvestQuintals || 0) * Number(record.salePricePerQtl || 0);
    const netProfit = totalSales - totalExpense;

    const enrichedRecord = {
      ...record,
      totalExpense,
      totalSales,
      netProfit,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      records[existingIndex] = enrichedRecord;
    } else {
      if (!enrichedRecord.id) {
        enrichedRecord.id = 'rec-' + Date.now();
      }
      enrichedRecord.createdAt = new Date().toISOString();
      records.unshift(enrichedRecord); // Add to top
    }

    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    return enrichedRecord;
  }

  deleteRecord(recordId) {
    let records = this.getAllRecords();
    records = records.filter(r => r.id !== recordId);
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    return records;
  }

  resetToSampleRecords() {
    if (typeof INITIAL_SAMPLE_FARM_RECORDS !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_SAMPLE_FARM_RECORDS));
      return INITIAL_SAMPLE_FARM_RECORDS;
    }
    return [];
  }
}

const storageService = new StorageService();
