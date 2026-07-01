const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const firebasePlistPath = path.join(
  projectRoot,
  'ios',
  'OIL',
  'GoogleService-Info.plist',
);

if (!fs.existsSync(firebasePlistPath)) {
  console.error(
    [
      'Missing ios/OIL/GoogleService-Info.plist.',
      'Register the iOS app in Firebase with the Xcode target bundle identifier,',
      'then download GoogleService-Info.plist and place it at that exact path.',
    ].join('\n'),
  );
  process.exit(1);
}

const plist = fs.readFileSync(firebasePlistPath, 'utf8');
const requiredKeys = ['BUNDLE_ID', 'GOOGLE_APP_ID', 'PROJECT_ID'];
const getPlistValue = key =>
  plist.match(new RegExp(`<key>${key}</key>\\s*<string>([^<]+)</string>`))?.[1];
const missingKeys = requiredKeys.filter(key => !getPlistValue(key));

if (missingKeys.length > 0) {
  console.error(
    `Invalid GoogleService-Info.plist: missing ${missingKeys.join(', ')}.`,
  );
  process.exit(1);
}

const projectFile = fs.readFileSync(
  path.join(projectRoot, 'ios', 'OIL.xcodeproj', 'project.pbxproj'),
  'utf8',
);
const productName = projectFile.match(/PRODUCT_NAME = "?([^";]+)"?;/)?.[1];
const rawBundleId = projectFile.match(
  /PRODUCT_BUNDLE_IDENTIFIER = "?([^";]+)"?;/,
)?.[1];
const targetBundleId = rawBundleId?.replace(
  '$(PRODUCT_NAME:rfc1034identifier)',
  productName?.replace(/[^A-Za-z0-9.-]/g, '-') ?? '',
);
const firebaseBundleId = getPlistValue('BUNDLE_ID');

if (
  targetBundleId &&
  !targetBundleId.includes('$(') &&
  targetBundleId !== firebaseBundleId
) {
  console.error(
    `Bundle ID mismatch: Xcode uses ${targetBundleId}, but Firebase uses ${firebaseBundleId}.`,
  );
  process.exit(1);
}

console.log('iOS Firebase configuration found.');
