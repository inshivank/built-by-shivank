INSERT OR IGNORE INTO "Certification" (
  "id",
  "title",
  "issuer",
  "date",
  "credentialUrl",
  "skills",
  "order",
  "published",
  "createdAt",
  "updatedAt"
) VALUES
  (
    'cert-0',
    'Deep Learning Specialization',
    'Coursera (DeepLearning.AI)',
    'Aug 2025',
    'https://coursera.org/verify/specialization/DL2025',
    '[]',
    0,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'cert-1',
    'Meta Front-End Developer Specialization',
    'Coursera (Meta)',
    'May 2025',
    'https://coursera.org/verify/specialization/META2025',
    '[]',
    1,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'cert-2',
    'AWS Certified Cloud Practitioner',
    'Amazon Web Services (AWS)',
    'Dec 2024',
    'https://aws.amazon.com/verification',
    '[]',
    2,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );
