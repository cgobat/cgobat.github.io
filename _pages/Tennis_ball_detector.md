---
permalink: /tennisball/
title: "Tennis Ball Detector"
author_profile: true
redirect_from: 
  - /plots/
  - /gallery
  - /plots
---


# Tennis Ball Detector Project
### ASTR 3141, Fall 2019

Goal: Accurately predict how many tennis balls were thrown given how many were collected in the detector


P(A |<sub> B</sub>) : P(B) = P(B |<sub> A</sub>) * P(A)

P(model |<sub> data</sub>) * P(data) = P(data |<sub> model</sub>) * P(model)

P(model) = P(S<sub>4</sub>) = P(S<sub>4</sub>| <sub>obs1</sub>) + P(S<sub>4</sub>| <sub>obs2</sub>) + P(S<sub>4</sub>| <sub>obs3</sub>) + P(S<sub>4</sub>| <sub>obs4</sub>)

P(obs3) = P(obs3 | S<sub>1</sub>) + P(obs3 | S<sub>2</sub>) + P(obs3 | S<sub>3</sub>) + P(obs3 | S<sub>4</sub>) = 0 + 0 + P(obs3 | S<sub>3</sub>) + P(obs3 | S<sub>4</sub>)

^^ this is the response function

P(model) is based on the source behavior. Does the source emit some number more often than another? (aka prior; high risk) For us, this is 1/11 because all sources occur equally as often

P(data | model) is the values in the response table

P(data) is the probability of detecting a given number out of all trials ever


```python
%matplotlib inline
import matplotlib.pyplot as plt, scipy, numpy as np, pandas as pd, seaborn as sns
from mpl_toolkits.mplot3d import Axes3D
```


```python
# cell to upload the csv for the response matrix data
from google.colab import files
files.upload()
```



     <input type="file" id="files-f487d890-4a6e-4e37-a18b-e2a01af439bf" name="files[]" multiple disabled />
     <output id="result-f487d890-4a6e-4e37-a18b-e2a01af439bf">
      Upload widget is only available when the cell has been executed in the
      current browser session. Please rerun this cell to enable.
      </output>
      <script src="/nbextensions/google.colab/files.js"></script> 


    Saving probabilitymatrix.csv to probabilitymatrix.csv
    




    {'probabilitymatrix.csv': b'# detected,source 0,source 1,source 2,source 3,source 4,source 5,source 6,source 7,source 8,source 9,source 10\r\n0,1.00,0.43,0.27,0.33,0.13,0.27,0.07,0.07,0.00,0.00,0.07\r\n1,0.00,0.57,0.53,0.33,0.47,0.23,0.43,0.33,0.17,0.07,0.13\r\n2,0.00,0.00,0.20,0.33,0.13,0.37,0.40,0.20,0.30,0.17,0.07\r\n3,0.00,0.00,0.00,0.00,0.23,0.13,0.07,0.27,0.43,0.33,0.07\r\n4,0.00,0.00,0.00,0.00,0.03,0.00,0.03,0.10,0.10,0.23,0.30\r\n5,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.03,0.00,0.20,0.17\r\n6,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.20\r\n7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00\r\n8,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00\r\n9,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00\r\n10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00'}




```python
# load the uploaded csv file into a Pandas dataframe variable
data = pd.read_csv('probabilitymatrix.csv') # replace with whatever the file name that you uploaded is
matrix = data.drop(['# detected'],axis=1)
matrix
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>source 0</th>
      <th>source 1</th>
      <th>source 2</th>
      <th>source 3</th>
      <th>source 4</th>
      <th>source 5</th>
      <th>source 6</th>
      <th>source 7</th>
      <th>source 8</th>
      <th>source 9</th>
      <th>source 10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>0.43</td>
      <td>0.27</td>
      <td>0.33</td>
      <td>0.13</td>
      <td>0.27</td>
      <td>0.07</td>
      <td>0.07</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.07</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0</td>
      <td>0.57</td>
      <td>0.53</td>
      <td>0.33</td>
      <td>0.47</td>
      <td>0.23</td>
      <td>0.43</td>
      <td>0.33</td>
      <td>0.17</td>
      <td>0.07</td>
      <td>0.13</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.20</td>
      <td>0.33</td>
      <td>0.13</td>
      <td>0.37</td>
      <td>0.40</td>
      <td>0.20</td>
      <td>0.30</td>
      <td>0.17</td>
      <td>0.07</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.23</td>
      <td>0.13</td>
      <td>0.07</td>
      <td>0.27</td>
      <td>0.43</td>
      <td>0.33</td>
      <td>0.07</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.03</td>
      <td>0.00</td>
      <td>0.03</td>
      <td>0.10</td>
      <td>0.10</td>
      <td>0.23</td>
      <td>0.30</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.03</td>
      <td>0.00</td>
      <td>0.20</td>
      <td>0.17</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.20</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
  </tbody>
</table>
</div>




```python
# create a color matrix of the response function
plt.matshow(matrix,cmap='ocean_r')
plt.gca().invert_yaxis()
plt.xlabel('Source output (balls)')
plt.ylabel('Instrument detection (balls)')
plt.title('Response Function:\nPossibility to detect Y given a source that emits X',pad=30)
plt.colorbar(label='Probability of detection')
plt.show()
print("For more info on colormap options, see https://matplotlib.org/3.1.1/tutorials/colors/colormaps.html")
```


![png](output_5_0.png)


    For more info on colormap options, see https://matplotlib.org/3.1.1/tutorials/colors/colormaps.html
    


```python
# create a 3D surface plot of the same matrix
plt.ion()
X,Y = np.meshgrid(np.arange(0,11),matrix.index)
Z = matrix
fig = plt.figure()
ax = fig.add_subplot(111,projection='3d')
ax.plot_surface(X, Y, Z)
ax.view_init(30, 120) # altitude, azimuth

plt.show()
```


![png](output_6_0.png)



```python
def pModel_Data(model,observation,response):
  pdata = [sum(response.iloc[row,:]) for row in range(len(response))] # total percentage of occurences for each observation count across all trials
  pdata = [pdata[i]/sum(pdata) for i in range(len(pdata))] # normalize it
  probability = matrix.iloc[observation,model] * (1/len(response)) / pdata[observation] # Bayesian statistic formula as outlined in the header
  return probability

def mostLikelySource(obs): #call this function with the number observed as the argument to pick which source is most likely to have thrown that number
  sourceprobs = [pModel_Data(i,obs,matrix) for i in range(11)]
  bestsource = sourceprobs.index(max(sourceprobs))
  probability = max(sourceprobs)
  return bestsource, probability

def sourceChances(obs):
  sourceprobs = [pModel_Data(i,obs,matrix) for i in range(11)]
  bestsource = sourceprobs.index(max(sourceprobs))
  probability = max(sourceprobs)
  return sourceprobs
```


```python
observation = 3 # how many were observed?
source, confidence = mostLikelySource(observation) # calculate which source is most likely to have resulted in this observation
print(f"Given an observation of {observation} balls, it is most likely that the source emitted {source} balls.\nWe can say this with {round(confidence*100,1)}% confidence.")
```

    Given an observation of 3 balls, it is most likely that the source emitted 8 balls.
    We can say this with 30.0% confidence.
    


```python
model = pd.DataFrame([mostLikelySource(i) for i in range(len(matrix))],columns={'Prediction','Probability'})
model.index.name = "Observation"
print(model)
```

                 Prediction  Probability
    Observation                         
    0                     0     0.378444
    1                     1     0.174688
    2                     6     0.184164
    3                     8     0.280790
    4                    10     0.379402
    5                     9     0.499545
    6                    10     0.999091
    7                     0          NaN
    8                     0          NaN
    9                     0          NaN
    10                    0          NaN
    

    /usr/local/lib/python3.6/dist-packages/ipykernel_launcher.py:4: RuntimeWarning: invalid value encountered in double_scalars
      after removing the cwd from sys.path.
    


```python
fig, ax = plt.subplots()
fig.set_facecolor('lightgrey')
ax.set_facecolor('grey')
plt.scatter(model.index,model['Prediction'],c=model['Probability'],cmap='copper_r',marker='P')
plt.colorbar(label='Prediction confidence')
plt.xlabel('Number of balls observed')
plt.ylabel('Most probable source to have emitted them')
plt.title('Predictive source model')
plt.show()
```


![png](output_10_0.png)



```python
mostLikelySource(3)
```




    (8, 0.2807902554961379)




```python
sourceChances(3)
```




    [0.0,
     0.0,
     0.0,
     0.0,
     0.15019013666072492,
     0.08489007724301843,
     0.04571004159239454,
     0.1763101604278075,
     0.2807902554961379,
     0.2154901960784314,
     0.04571004159239454]

