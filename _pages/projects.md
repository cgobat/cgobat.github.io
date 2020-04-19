---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

Listed here are my projects of substance, typically as part of or inspired by work for a class.

Pulsar Nulling Analysis (in progress)
------
I am currently working to analyze radio pulsar data in regards to the phenomenon of _nulling_, which is when pulsars skip pulse emission for one or many periods at a time. The code, which is still in active development, is at [cgobat/pulsar-nulling](https://github.com/cgobat/pulsar-nulling).

Coronavirus/COVID-19 Response (in progress)
------
The coronavirus outbreak and resulting COVID-19 pandemic has inspired me ad several of my peers to write various pieces of software to respond to the crisis. The main component is an app that employs several web APIs to allow users to find the quickest care facility, taking into account location and wait time at hospitals and clinics nearby. This project is hosted at [gw-innovation-lab/hospitalApp](https://github.com/gw-innovation-lab/hospitalApp). Separately I have created a live tracker that plots cases per country on a day-to-day basis. Additionally, I've parsed [Google's COVID-19 Community Mobility Report](https://www.google.com/covid19/mobility/) on the United States from 29 March 2020 into a usable data format to enable visualization and comparison between states based on number of cases and percentage of the population infected.
This self-contained code block generates a workable versatile dataframe that includes a live count of active cases on a state-by-state basis, as well as population information from Wikipedia:
```python
mobility_df = pd.read_csv('mobility_reports.csv').set_index('State')
for column in mobility_df.columns:
    mobility_df[column] = mobility_df[column].str.rstrip('%').astype('float') / 100

# Grab number of COVID-19 cases per state
cases_json = json.loads(requests.get("https://corona.lmao.ninja/states").content)
statetotals = {}
for entry in cases_json:
    statetotals[entry['state']] = entry['active']
for state in mobility_df.index:
    mobility_df.loc[state,'COVID-19 cases'] = statetotals[state.title()]

# Grab state populations for comparison
statepops = pd.read_html("https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States_by_population")[0]
statepops.columns = statepops.columns.droplevel()
statepops = statepops.iloc[:,2:4].set_index('State')
statepops.columns = ['Population']
mobility_df['Population'] = statepops['Population']

mobility_df['Infected fraction'] = mobility_df['COVID-19 cases']/mobility_df['Population']
```
The entirety of this tracking and analysis code can be found in [this jupyter/IPython notebook](https://drive.google.com/file/d/1e_QzNep3Kp-xscIe2_PvDgDmrV5ZX6aT/view?usp=sharing).

Stellar Spectral Analysis Pipeline
------
This is a fitting engine started for a class project that uses SDSS data to infer stars' distance from Earth. Code can be found at [cgobat/stellar-spectra](https://github.com/cgobat/stellar-spectra). Details of methodology and functionality can be found in [this report](https://github.com/cgobat/stellar-spectra/blob/master/Spectral_Analysis_Report.pdf). An example of a spectrum fitted using this pipeline can be seen in the output of cell [6] in [`Magnitude spectrum analysis.ipynb`](https://github.com/cgobat/stellar-spectra/blob/master/Magnitude%20spectrum%20analysis.ipynb). Given the size and significance of this work, there's not really a convenient excerpt I can provide here as a summary. However, I'd love to walk through it with you/talk if you have questions!

H-R Diagram Visualization
------
This was a data viz project that generates a visually appealing Hertzsprung-Russel diagram, a foundational visualization tool of modern astronomy that plots stars' temperatures or spectral classes against their luminosities. All of the source code for the plotting and [report](https://github.com/cgobat/hr-diagram/blob/master/LaTeX%20report/H_R_report.pdf) typesetting can be found in [cgobat/hr-diagram](https://github.com/cgobat/hr-diagram). This is the final result: ![H-R.png](https://raw.githubusercontent.com/cgobat/hr-diagram/master/LaTeX%20report/figures/diagram.png)

[Tennis Ball Astrophysical Detector Simulation](https://cgobat.github.io/projects/tennisball/)
------
For this project, I worked to create and characterize a "tennis ball detector," meant to stand as a emulation of an astrophysical observation instrument. The project demonstrates concepts such as detector response matrices and Bayesian statistical inference, while providing some fun throwing tennis balls into a bucket along the way.
