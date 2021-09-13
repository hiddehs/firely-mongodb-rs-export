# Firely MongoDB exporter


### export entries from db to json
```bash
mongoexport --uri "mongodb://username:password@host:port/db" --collection=vonkentries --out=vonkentries.json --fields=res_json,type
```
### convert into .json files -> then zip
```bash
node convert.js
```