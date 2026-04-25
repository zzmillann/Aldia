import json
import os

with open('c:/Users/Alejandro/Documents/Freelance/Aldia/flujoscarap.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('c:/Users/Alejandro/Documents/Freelance/Aldia/node_summary.txt', 'w', encoding='utf-8') as out:
    for i, node in enumerate(data.get('nodes', [])):
        out.write(f'\n=========================================\n')
        out.write(f'NODO {i+1}: {node.get("name")}\n')
        out.write(f'TIPO: {node.get("type")}\n')
        out.write(f'=========================================\n')
        
        if 'jsCode' in node.get('parameters', {}):
            out.write('--- CÓDIGO JAVASCRIPT ---\n')
            out.write(node['parameters']['jsCode'] + '\n')
            out.write('-------------------------\n')
        
        if 'assignments' in node.get('parameters', {}):
            assignments = node["parameters"]["assignments"].get("assignments", [])
            out.write(f'SET ({len(assignments)} variables):\n')
            for a in assignments:
                out.write(f' - {a.get("name")} = {a.get("value")}\n')
