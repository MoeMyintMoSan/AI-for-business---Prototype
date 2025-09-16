#!/usr/bin/env python3
"""
StockWise AI - Kaggle Dataset Downloader
Downloads and organizes datasets for the StockWise AI prototype
"""

import kagglehub
import os
import shutil
import json
from pathlib import Path

# Dataset configurations matching your datasetConfig.js
DATASETS = {
    'ecommerce_sales': {
        'kaggle_id': 'prasad22/retail-transactions-dataset',
        'name': 'E-commerce Sales Data',
        'description': 'Retail transaction data for e-commerce analysis'
    },
    'inventory_mgmt': {
        'kaggle_id': 'vinothkannaece/sales-dataset',
        'name': 'Inventory Management Data',
        'description': 'Sales data optimized for inventory management'
    },
    'seasonal_trends': {
        'kaggle_id': 'crawford/weekly-sales-transactions',
        'name': 'Seasonal Trends Data',
        'description': 'Weekly sales transactions showing seasonal patterns'
    },
    'customer_behavior': {
        'kaggle_id': 'srinivasav22/sales-transactions-dataset',
        'name': 'Customer Behavior Data',
        'description': 'Sales transactions for customer behavior analysis'
    }
}

def setup_dataset_directory():
    """Create the dataset directory structure"""
    base_path = Path('src/data/datasets')
    base_path.mkdir(parents=True, exist_ok=True)
    return base_path

def download_dataset(dataset_id, kaggle_id, dataset_name):
    """Download a single dataset from Kaggle"""
    print(f"\n📥 Downloading {dataset_name}...")
    print(f"   Kaggle ID: {kaggle_id}")
    
    try:
        # Download dataset
        path = kagglehub.dataset_download(kaggle_id)
        print(f"   ✅ Downloaded to: {path}")
        return path
    except Exception as e:
        print(f"   ❌ Error downloading {dataset_name}: {e}")
        return None

def organize_dataset(source_path, dataset_id, base_path):
    """Move and organize dataset files"""
    if not source_path:
        return False
    
    target_dir = base_path / dataset_id
    target_dir.mkdir(exist_ok=True)
    
    try:
        # Copy all files from source to target
        source = Path(source_path)
        for file_path in source.glob('*'):
            if file_path.is_file():
                target_file = target_dir / file_path.name
                shutil.copy2(file_path, target_file)
                print(f"   📁 Copied: {file_path.name}")
        
        return True
    except Exception as e:
        print(f"   ❌ Error organizing files: {e}")
        return False

def create_dataset_info(base_path, dataset_id, dataset_info):
    """Create a dataset info file"""
    info_file = base_path / dataset_id / 'dataset_info.json'
    
    info = {
        'id': dataset_id,
        'name': dataset_info['name'],
        'description': dataset_info['description'],
        'kaggle_id': dataset_info['kaggle_id'],
        'downloaded_at': str(Path().cwd()),
        'files': []
    }
    
    # List files in the dataset directory
    dataset_dir = base_path / dataset_id
    if dataset_dir.exists():
        info['files'] = [f.name for f in dataset_dir.glob('*') if f.is_file() and f.name != 'dataset_info.json']
    
    with open(info_file, 'w') as f:
        json.dump(info, f, indent=2)
    
    print(f"   📋 Created info file with {len(info['files'])} files")

def main():
    """Main function to download and organize all datasets"""
    print("🚀 StockWise AI - Kaggle Dataset Downloader")
    print("=" * 50)
    
    # Setup directory
    base_path = setup_dataset_directory()
    print(f"📂 Dataset directory: {base_path.absolute()}")
    
    success_count = 0
    
    # Download each dataset
    for dataset_id, dataset_info in DATASETS.items():
        print(f"\n🎯 Processing dataset: {dataset_id}")
        
        # Download from Kaggle
        source_path = download_dataset(dataset_id, dataset_info['kaggle_id'], dataset_info['name'])
        
        # Organize files
        if organize_dataset(source_path, dataset_id, base_path):
            create_dataset_info(base_path, dataset_id, dataset_info)
            success_count += 1
            print(f"   ✅ Successfully processed {dataset_info['name']}")
        else:
            print(f"   ❌ Failed to process {dataset_info['name']}")
    
    # Summary
    print("\n" + "=" * 50)
    print(f"📊 Summary: {success_count}/{len(DATASETS)} datasets processed successfully")
    
    if success_count > 0:
        print(f"\n🎉 Datasets ready for StockWise AI!")
        print(f"📁 Location: {base_path.absolute()}")
        print("\n🔄 Next steps:")
        print("1. Add your Gemini API key to .env.local")
        print("2. Start the development server: npm run dev")
        print("3. Navigate to the Forecasting page to test AI predictions")
    else:
        print("\n❗ No datasets were downloaded. Please check your Kaggle authentication.")
        print("   Run: kaggle auth login")

if __name__ == "__main__":
    # Check if kagglehub is available
    try:
        import kagglehub
        main()
    except ImportError:
        print("❌ Error: kagglehub not installed")
        print("   Install with: pip install kagglehub")