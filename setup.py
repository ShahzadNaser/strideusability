from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in strideusability/__init__.py
from strideusability import __version__ as version

setup(
	name="strideusability",
	version=version,
	description="StrideUsability",
	author="Shahzad Naser",
	author_email="shahzadnaser1122@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
