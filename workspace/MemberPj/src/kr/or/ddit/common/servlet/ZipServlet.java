package kr.or.ddit.common.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.common.service.ZipService;
import kr.or.ddit.common.vo.ZipVO;

@WebServlet("/ZipServlet")
public class ZipServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doPost(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
		//☆ param Dong으로 설정해야함
		String str = req.getParameter("Dong");
		ZipService zipService = new ZipService();
		String flag = req.getParameter("flag");
		List<ZipVO> list;
		ZipVO zipVo = new ZipVO();
		
		list = zipService.retrieveZipList(str);
		
		req.setAttribute("list", list);
		RequestDispatcher  disp = req.getRequestDispatcher("/html/common/zipListResult.jsp");
		disp.forward(req, resp);
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
