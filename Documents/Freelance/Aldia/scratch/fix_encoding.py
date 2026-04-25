import os

file_paths = [
    r'c:\Users\Alejandro\Documents\Freelance\Aldia\servicios.html',
    r'c:\Users\Alejandro\Documents\Freelance\Aldia\styles\style.css'
]

# Order matters: replace longer sequences first to avoid partial replacements
replacements = [
    ('â†—', '↗'),
    ('Ã“', 'Ó'),
    ('Ãš', 'Ú'),
    ('Ã‰', 'É'),
    ('Ã‘', 'Ñ'),
    ('Ã¡', 'á'),
    ('Ã©', 'é'),
    ('Ã­', 'í'),
    ('Ã³', 'ó'),
    ('Ãº', 'ú'),
    ('Ã±', 'ñ'),
    ('Ã ', 'à'),
    ('Ã¿', '¿'),
    ('Â¡', '¡'),
    ('Ã', 'Á'), 
    ('Á“', 'Ó'),
    ('Áš', 'Ú'),
    ('Á‰', 'É'),
    ('Á‘', 'Ñ')
]

for file_path in file_paths:
    if not os.path.exists(file_path): continue
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    for key, val in replacements:
        text = text.replace(key, val)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)

print("Restored encoding and arrows correctly for all files")
