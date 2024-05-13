import {useState , useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

function Categories() {
    const categories = useCategory();
  return (
    <Layout title={'All Categories'}>
        <div className="container">
            <div className="row">
                {categories?.map( c => (
                    <div key={c._id} className="col-md-6 mt-5 mb-3 gx-3 gy-3">
                        <div className="card">
                            <div className="card-body">
                                <Link to={`/category/${c.slug}`} className="card-title">{c.name}</Link>
                            </div>
                        </div>
                    </div>
                
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories