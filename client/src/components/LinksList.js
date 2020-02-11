import React from 'react'
import {Link} from "react-router-dom";


export const LinksList = ({links}) => {

    if (!links.length)
        return (
            <p className={'center'}>Ссылок нет</p>
        )

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, idx) => (
                <tr key={link._id}>
                    <td>{++idx}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/detail/${link._id}`}>Подробнее</Link></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}