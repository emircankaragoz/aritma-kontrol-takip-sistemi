import React , {useState}from "react";
import { useFormik } from "formik";
import  Table  from "@/components/SuComponents/Tables/Table";


export default function IsletmeSuyuKontrolFormComp() {
  const [data,setData] = useState([]);
  const formik = useFormik({
    initialValues: {
      ph: '',
      sertlik: '',
      bikarbonat: ''
    },
    onSubmit: values => {
      setData(values);
    }
  })
  return (
    <>    
          <div>
            <form onSubmit={formik.handleSubmit}>
              <input
                id="ph"
                type="text"
                name="ph"
                required="required"
                placeholder="pH"
                onChange={formik.handleChange}
                value={formik.values.ph}
              />
              <input
                id="sertlik"
                type="text"
                name="sertlik"
                required="required"
                placeholder="Sertlik"
                onChange={formik.handleChange}
                value={formik.values.sertlik}
              />
              <input
                id="bikarbonat"
                type="text"
                name="bikarbonat"
                required="required"
                placeholder="Bikarbonat"
                onChange={formik.handleChange}
                value={formik.values.bikarbonat}
              />
              <button type="submit">Add</button>
            </form>
            <Table data={data}/>
          </div>
    </>
  );
}

