
---
layout: posts
title: "Run Apache Spark(2.0) On a local machine"
date: 2018-05-1
---
# Running Apache Spark on Local Machine Using Python
# -*- coding: utf-8 -*-
"""
Make sure you give execute privileges
"""



```python
import os
import sys

```

# NOTE: Please change the folder paths to your current setup.


```python
#Windows
if sys.platform.startswith('win'):
    #point to the folder where you have all the resources for apache spark such as csv files
    os.chdir("/Users/ashishbansal/Downloads/SparkPythonResources")
    #Where you installed spark.    
    os.environ['SPARK_HOME'] = '/Users/ashishbansal/Downloads/spark-2.0.0-bin-hadoop2.7'
#other platforms - linux/mac
else:
    os.chdir("/Users/ashishbansal/Downloads/SparkPythonResources")
    os.environ['SPARK_HOME'] = '/Users/ashishbansal/Downloads/spark-2.0.0-bin-hadoop2.7'

os.curdir
```

# Create a variable for our root path


```python
SPARK_HOME = os.environ['SPARK_HOME']
#Add the following paths to the system path. Please check your installation
#to make sure that these zip files actually exist. The names might change
#as versions change.
sys.path.insert(0,os.path.join(SPARK_HOME,"python"))
sys.path.insert(0,os.path.join(SPARK_HOME,"python","lib"))
sys.path.insert(0,os.path.join(SPARK_HOME,"python","lib","pyspark.zip"))
sys.path.insert(0,os.path.join(SPARK_HOME,"python","lib","py4j-0.10.1-src.zip"))

#Initialize SparkSession and SparkContext
from pyspark.sql import SparkSession
from pyspark import SparkContext

#Create a Spark Session
SpSession = SparkSession \
    .builder \
    .master("local[2]") \
    .appName("ashish") \
    .config("spark.executor.memory", "1g") \
    .config("spark.cores.max","2") \
    .config("spark.sql.warehouse.dir", "file:///c:/temp/spark-warehouse")\
    .getOrCreate()
    
#Get the Spark Context from Spark Session    
SpContext = SpSession.sparkContext

#Test Spark
testData = SpContext.parallelize([3,6,4,2])
testData.count()
#check http://localhost:4040 to see if Spark is running
#SpContext.stop() to stop your spark context
```
