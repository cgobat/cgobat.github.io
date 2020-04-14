---
layout: archive
title: "Code Showcase"
permalink: /code/
author_profile: true
---

Listed here are some less monumental pieces of code that are still worth sharing for one reason or another.

## [Spherical Harmonics visualization](https://gist.github.com/cgobat/a13bb5fa5b854de586e43d841350a34b)
Function that takes the _l_ and _m_ (as well as a scaling coefficient) of one or multiple Laplace spherical harmonics and plots the superposition of one over the other. The meat of it is contained here:
```python
THETA, PHI = np.meshgrid(theta, phi) # 2D versions of the independent variables
XYZ = np.array([np.sin(PHI) * np.sin(THETA), np.sin(PHI) * np.cos(THETA), np.cos(PHI)]) 


def plot_sph_harm(*params): # pass a tuple of (c,l,m) for each harmonic to be summed
    orbitals = "spdf"
    fig = plt.figure(figsize=(8,8)) # init figure
    ax = fig.add_subplot( 111 , projection='3d') # init 3D axis
    Y = 0 # init function value
    titlestr = "" # init plot title
    
    for term in params:
        (c,l,m) = term
        if type(l) != int:
            l = orbitals.index(l)
        Y_lm = c*sph_harm(m, l, THETA, PHI) # calculate the spherical harmonic solution for this m and l combo
        Y += Y_lm # add it to the full thing
        titlestr += "+%.2fY$_%i^%i$" %(c,l,m)
    
    [X,Y,Z] = np.abs(Y.real)*XYZ # take the real part's absolute value and map it back into cartesian
    colormap = cm.ScalarMappable(cmap=plt.get_cmap("Wistia_r"))
    axislim = 0.25
    ax.plot_surface(X, Y, Z, facecolors=colormap.to_rgba(np.sqrt(X*X+Y*Y+Z*Z)), rstride=1, cstride=1) # plot ittttttt
    ax.set_xlim(-axislim,axislim)
    ax.set_ylim(-axislim,axislim)
    ax.set_zlim(-axislim,axislim)
    ax.set_axis_off() # turn off the grid and axes to make it pretty
    fig.suptitle("Laplace spherical harmonic ($\mathbb{R}^3$): "+titlestr[1:])
    plt.show()
```
And an example of what this script is capable of outputting:

![Vibrating water droplet model](https://user-images.githubusercontent.com/36030084/79178651-98d97a80-7dba-11ea-9b0c-e68f7ad4e289.png)

## [GW Course Map](https://github.com/cgobat/gw-course-map)
Script that maps prerequisite dependencies as well as courses that satisfy multiple general education requirements to enable the most efficient completion of requirements for courses offered at GWU. Since there are several components and not necessarily any pretty output (yet), it's probably easiest just to check out the code at the main repo linked above.

## [Monte-Carlo demonstration to approximate π](https://gist.github.com/cgobat/6cf66e89463be64142dd7b7366d34730)
Quick, naïve implementation of a pseudo-"Monte-Carlo" method to estimate the value of pi based on the probability of random chosen points falling inside its area.
```python
N = 100
trials = 50000
theta = np.linspace(0,2*np.pi,360)
fractions = np.array([])
for i in range(trials):
    points = np.array([[2*x-1,2*y-1] for [x,y] in np.random.rand(N,2)])
    C = np.array([point for point in points if point[0]**2+point[1]**2 <= 1])
    fractions = np.append(fractions, len(C)/len(points))

plt.plot(np.cos(theta),np.sin(theta),color="steelblue")
plt.scatter(*points.T, marker=".",color="darkcyan")

plt.axhline(0,color="black",alpha=0.5)
plt.axvline(0,color="black",alpha=0.5)
plt.xlim((-1,1))
plt.ylim((-1,1))
plt.gca().set_aspect('equal')
plt.show()

print("This simulation puts the value of pi at approximately",4*np.mean(fractions))
```

## [Simple NASA image API query engine](https://gist.github.com/cgobat/73b9deaba6ae0f60f0abaf4bc2304773)
Simple demonstration of web-scraping functionality to retrieve images from NASA's RESTful image API. Enter any search query and the number of desired results.
```python
def NASA_img(query,num):

    endpoint = "https://images-api.nasa.gov/search?q="+str(query).replace(" ","+")
    response = requests.get(endpoint)
    results = json.loads(response.content)

    IDs = []
    for entry in results['collection']['items']:
        entrydata = entry['data'][0]
        if entrydata['media_type'] == 'image':
            IDs.append(entrydata['nasa_id'])
    for ID in IDs[:num]:
        asseturl = "https://images-api.nasa.gov/asset/"+str(ID)
        assets = json.loads(requests.get(asseturl).content)
        link = str(assets['collection']['items'][0]['href'])

        response = requests.get(link, stream=True)
        img = Image.open(response.raw)
        
        plt.imshow(img)
        plt.axis("off")
        plt.show()
        print("Asset pointer:",link,"({} of {})".format(IDs.index(ID)+1,min([len(IDs),num])))
```
