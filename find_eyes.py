import numpy as np
from PIL import Image
from scipy.ndimage import label, center_of_mass

img = Image.open(r'C:\Users\royri\Downloads\Portfolio\public\character_hero.png').convert('RGB')
data = np.array(img)
white_mask = (data[:,:,0] > 230) & (data[:,:,1] > 230) & (data[:,:,2] > 230)

labeled, num = label(white_mask)
sizes = [np.sum(labeled == i) for i in range(1, num + 1)]
sorted_labels = np.argsort(sizes)[::-1]
h, w = data.shape[:2]

print('Top 5 blobs:')
for i in range(min(5, len(sorted_labels))):
    lbl = sorted_labels[i] + 1
    cy, cx = center_of_mass(white_mask, labeled, lbl)
    print(f'Size: {sizes[sorted_labels[i]]}, X={cx/w*100:.2f}%, Y={cy/h*100:.2f}%')
