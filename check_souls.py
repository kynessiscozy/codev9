import re
import os

os.chdir(r'c:\Users\hukeze\WorkBuddy\20260427084137\codev9')

# 读取 souls.js 中的所有武魂名称
with open('src/modules/data/souls.js', 'r', encoding='utf-8') as f:
    souls_content = f.read()

# 提取所有武魂名称
soul_names = re.findall(r'\{ n: "([^"]+)"', souls_content)
print(f'武魂总数: {len(soul_names)}')
print('武魂列表:')
for name in soul_names:
    print(f'  - {name}')

# 读取 soul-icons.js 中已有的武魂图标
with open('src/modules/ui/soul-icons.js', 'r', encoding='utf-8') as f:
    icons_content = f.read()

# 提取已有图标的武魂名称
icon_names = re.findall(r'^\s+"([^"]+)": \{', icons_content, re.MULTILINE)
print(f'\n已有图标数: {len(icon_names)}')

# 找出缺失的武魂
missing = [name for name in soul_names if name not in icon_names]
print(f'缺失图标数: {len(missing)}')
if missing:
    print('缺失的武魂:')
    for name in missing:
        print(f'  - {name}')
