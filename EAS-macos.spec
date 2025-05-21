# -*- mode: python ; coding: utf-8 -*-

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=[],
    datas=[('backend', 'backend'), ('resources', 'resources'), ('static', 'static'), ('templates', 'templates')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,       # exclude binaries from exe for folder build
    name='EAS',
    debug=False,
    strip=False,
    upx=True,
    console=False,
    icon='resources/icons/easLogo.icns'
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='EAS',
)

app = BUNDLE(
    coll,
    name='EAS.app',
    icon=icon_path,             # embed icon in your app bundle
    bundle_identifier=None,
)
