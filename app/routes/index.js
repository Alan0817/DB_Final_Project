var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  req.con.query('SELECT * FROM userPassword WHERE user=?',req.session.user,function(err,password){
    req.con.query('SELECT * FROM users_cleaned WHERE username=?',req.session.user,function(err,user){
      req.con.query('SELECT Japanese_name name,MAL_ID id FROM anime',function(err,anime){
        req.con.query('SELECT * FROM comment WHERE username=?',req.session.user,function(err,comment){
          var errorType=req.session.errorType;
          req.session.errorType=-1;
          res.render('index',{password:password,user:user,anime:anime,errorType:errorType,comment:comment});
          return;
        });
      });
    });
  });
});

router.get('/s1',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.genre)||(!req.query.number)){
    console.log('illegal data');
    req.session.errorType=3;
    res.redirect("/#s1");
    return;
  }
  var sql="SELECT Japanese_name AS name,Score FROM anime WHERE Genders like ? ORDER BY Score DESC LIMIT ?";
  req.con.query(sql,["%"+req.query.genre+"%",Number(req.query.number)],function(err,rows){
    res.render('search/s1',{rows:rows,genre:req.query.genre});
    return;
  });
});

router.get('/s2',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  var sql="SELECT count(*) n FROM (SELECT Japanese_name,Score,Genders FROM anime ORDER BY Score DESC LIMIT 100) top100 WHERE top100.Genders LIKE ?";
  req.con.query(sql,"%Action%",function(err,rows){
    var max=rows[0].n;
    var max_g="Action";
    req.con.query(sql,"%Adventure%",function(err,rows){
      if(rows[0].n>max){
        max=rows[0].n;
        max_g="Adventure";
      }
      req.con.query(sql,"%Cars%",function(err,rows){
        if(rows[0].n>max){
          max=rows[0].n;
          max_g="Cars";
        }
        req.con.query(sql,"%Comedy%",function(err,rows){
          if(rows[0].n>max){
            max=rows[0].n;
            max_g="Comedy";
          }
          req.con.query(sql,"%Dementia%",function(err,rows){
            if(rows[0].n>max){
              max=rows[0].n;
              max_g="Dementia";
            }
            req.con.query(sql,"%Demons%",function(err,rows){
              if(rows[0].n>max){
                max=rows[0].n;
                max_g="Demons";
              }
              req.con.query(sql,"%Drama%",function(err,rows){
                if(rows[0].n>max){
                  max=rows[0].n;
                  max_g="Drama";
                }
                req.con.query(sql,"%Ecchi%",function(err,rows){
                  if(rows[0].n>max){
                    max=rows[0].n;
                    max_g="Ecchi";
                  }
                  req.con.query(sql,"%Fantasy%",function(err,rows){
                    if(rows[0].n>max){
                      max=rows[0].n;
                      max_g="Fantasy";
                    }
                    req.con.query(sql,"%Game%",function(err,rows){
                      if(rows[0].n>max){
                        max=rows[0].n;
                        max_g="Game";
                      }
                      req.con.query(sql,"%Harem%",function(err,rows){
                        if(rows[0].n>max){
                          max=rows[0].n;
                          max_g="Harem";
                        }
                        req.con.query(sql,"%Hentai%",function(err,rows){
                          if(rows[0].n>max){
                            max=rows[0].n;
                            max_g="Hentai";
                          }
                          req.con.query(sql,"%Historical%",function(err,rows){
                            if(rows[0].n>max){
                              max=rows[0].n;
                              max_g="Historical";
                            }
                            req.con.query(sql,"%Horror%",function(err,rows){
                              if(rows[0].n>max){
                                max=rows[0].n;
                                max_g="Horror";
                              }
                              req.con.query(sql,"%Josei%",function(err,rows){
                                if(rows[0].n>max){
                                  max=rows[0].n;
                                  max_g="Josei";
                                }
                                req.con.query(sql,"%Kids%",function(err,rows){
                                  if(rows[0].n>max){
                                    max=rows[0].n;
                                    max_g="Kids";
                                  }
                                  req.con.query(sql,"%Magic%",function(err,rows){
                                    if(rows[0].n>max){
                                      max=rows[0].n;
                                      max_g="Magic";
                                    }
                                    req.con.query(sql,"%Martial Arts%",function(err,rows){
                                      if(rows[0].n>max){
                                        max=rows[0].n;
                                        max_g="Martial Arts";
                                      }
                                      req.con.query(sql,"%Mecha%",function(err,rows){
                                        if(rows[0].n>max){
                                          max=rows[0].n;
                                          max_g="Mecha";
                                        }
                                        req.con.query(sql,"%Military%",function(err,rows){
                                          if(rows[0].n>max){
                                            max=rows[0].n;
                                            max_g="Military";
                                          }
                                          req.con.query(sql,"%Music%",function(err,rows){
                                            if(rows[0].n>max){
                                              max=rows[0].n;
                                              max_g="Music";
                                            }
                                            req.con.query(sql,"%Mystery%",function(err,rows){
                                              if(rows[0].n>max){
                                                max=rows[0].n;
                                                max_g="Mystery";
                                              }
                                              req.con.query(sql,"%Parody%",function(err,rows){
                                                if(rows[0].n>max){
                                                  max=rows[0].n;
                                                  max_g="Parody";
                                                }
                                                req.con.query(sql,"%Police%",function(err,rows){
                                                  if(rows[0].n>max){
                                                    max=rows[0].n;
                                                    max_g="Police";
                                                  }
                                                  req.con.query(sql,"%Psychological%",function(err,rows){
                                                    if(rows[0].n>max){
                                                      max=rows[0].n;
                                                      max_g="Psychological";
                                                    }
                                                    req.con.query(sql,"%Romance%",function(err,rows){
                                                      if(rows[0].n>max){
                                                        max=rows[0].n;
                                                        max_g="Romance";
                                                      }
                                                      req.con.query(sql,"%Samurai%",function(err,rows){
                                                        if(rows[0].n>max){
                                                          max=rows[0].n;
                                                          max_g="Samurai";
                                                        }
                                                        req.con.query(sql,"%School%",function(err,rows){
                                                          if(rows[0].n>max){
                                                            max=rows[0].n;
                                                            max_g="School";
                                                          }
                                                          req.con.query(sql,"%Sci-Fi%",function(err,rows){
                                                            if(rows[0].n>max){
                                                              max=rows[0].n;
                                                              max_g="Sci-Fi";
                                                            }
                                                            req.con.query(sql,"%Seinen%",function(err,rows){
                                                              if(rows[0].n>max){
                                                                max=rows[0].n;
                                                                max_g="Seinen";
                                                              }
                                                              req.con.query(sql,"%Shoujo%",function(err,rows){
                                                                if(rows[0].n>max){
                                                                  max=rows[0].n;
                                                                  max_g="Shoujo";
                                                                }
                                                                req.con.query(sql,"%Shoujo Ai%",function(err,rows){
                                                                  if(rows[0].n>max){
                                                                    max=rows[0].n;
                                                                    max_g="Shoujo Ai";
                                                                  }
                                                                  req.con.query(sql,"%Shounen%",function(err,rows){
                                                                    if(rows[0].n>max){
                                                                      max=rows[0].n;
                                                                      max_g="Shounen";
                                                                    }
                                                                    req.con.query(sql,"%Shounen Ai%",function(err,rows){
                                                                      if(rows[0].n>max){
                                                                        max=rows[0].n;
                                                                        max_g="Shounen Ai";
                                                                      }
                                                                      req.con.query(sql,"%Slice of Life%",function(err,rows){
                                                                        if(rows[0].n>max){
                                                                          max=rows[0].n;
                                                                          max_g="Slice of Life";
                                                                        }
                                                                        req.con.query(sql,"%Space%",function(err,rows){
                                                                          if(rows[0].n>max){
                                                                            max=rows[0].n;
                                                                            max_g="Space";
                                                                          }
                                                                          req.con.query(sql,"%Sports%",function(err,rows){
                                                                            if(rows[0].n>max){
                                                                              max=rows[0].n;
                                                                              max_g="Sports";
                                                                            }
                                                                            req.con.query(sql,"%Super Power%",function(err,rows){
                                                                              if(rows[0].n>max){
                                                                                max=rows[0].n;
                                                                                max_g="Super Power";
                                                                              }
                                                                              req.con.query(sql,"%Supernatural%",function(err,rows){
                                                                                if(rows[0].n>max){
                                                                                  max=rows[0].n;
                                                                                  max_g="Supernatural";
                                                                                }
                                                                                req.con.query(sql,"%Thriller%",function(err,rows){
                                                                                  if(rows[0].n>max){
                                                                                    max=rows[0].n;
                                                                                    max_g="Thriller";
                                                                                  }
                                                                                  req.con.query(sql,"%Vampire%",function(err,rows){
                                                                                    if(rows[0].n>max){
                                                                                      max=rows[0].n;
                                                                                      max_g="Vampire";
                                                                                    }
                                                                                    req.con.query(sql,"%Yaoi%",function(err,rows){
                                                                                      if(rows[0].n>max){
                                                                                        max=rows[0].n;
                                                                                        max_g="Yaoi";
                                                                                      }
                                                                                      req.con.query(sql,"%Yuri%",function(err,rows){
                                                                                        if(rows[0].n>max){
                                                                                          max=rows[0].n;
                                                                                          max_g="Yuri";
                                                                                        }
                                                                                        res.render('search/s2',{max:max_g});
                                                                                        return;
                                                                                      });
                                                                                    });
                                                                                  });
                                                                                });
                                                                              });
                                                                            });
                                                                          });
                                                                        });
                                                                      });
                                                                    });
                                                                  });
                                                                });
                                                              });
                                                            });
                                                          });
                                                        });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
router.get('/s3',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.gender)||(!req.query.genre)){
    console.log('illegal data');
    req.session.errorType=5;
    res.redirect("/#s3");
    return;
  }
  var sql="SELECT COUNT(*) AS n FROM (SELECT username,anime_id FROM animelist_cleaned) animelist_clean LEFT OUTER JOIN (SELECT username,gender FROM users_cleaned WHERE gender LIKE ?) user_clean ON user_clean.username = animelist_clean.username LEFT OUTER JOIN (SELECT anime_id,genre FROM AnimeList9 WHERE genre LIKE ?) Anime ON animelist_clean.anime_id = Anime.anime_id WHERE genre IS NOT NULL";
  req.con.query(sql,[req.query.gender,"%"+req.query.genre+"%"],function(err,rows){
    res.render('search/s3',{rows:rows});
    return;
  });
});
router.get('/s4',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.gender)){
    console.log('illegal data');
    req.session.errorType=6;
    res.redirect("/#s4");
    return;
  }
  var sql="SELECT user.mean AS n FROM (SELECT AVG(stats_mean_score) mean FROM users_cleaned WHERE gender LIKE ?) user";
  req.con.query(sql,req.query.gender,function(err,rows){
    res.render('search/s4',{rows:rows});
    return;
  });
});
router.get('/s5',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.first)||(!req.query.second)||(!req.query.genre)){
    console.log('illegal data');
    req.session.errorType=7;
    res.redirect("/#s5");
    return;
  }
  var sql="WITH user AS (WITH tmp AS (SELECT now() AS today, username, birth_date, year( from_days( datediff( now(), birth_date ))) AS age FROM users_cleaned)SELECT now() AS today, username, birth_date, year( from_days( datediff( now(), birth_date ))) AS age FROM tmp WHERE age >= ? AND age <= ?)SELECT anime.Name AS name, ROUND(AVG(score), 3) AS avg_score FROM (animelist_cleaned LEFT OUTER JOIN user ON animelist_cleaned.username = user.username) LEFT OUTER JOIN anime ON anime.MAL_ID = animelist_cleaned.anime_id WHERE anime.Genders LIKE ? GROUP BY anime.Name ORDER BY avg_score DESC LIMIT 100";

  req.con.query(sql,[Number(req.query.first),Number(req.query.second),"%"+req.query.genre+"%"],function(err,rows){
    res.render('search/s5',{rows:rows,genre:req.query.genre});
    return;
  });
});
router.get('/s6',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.first)||(!req.query.second)){
    console.log('illegal data');
    req.session.errorType=8;
    res.redirect("/#s6");
    return;
  }
  var sql="WITH tmp AS (SELECT now() AS today, username, stats_mean_score, year( from_days( datediff( now(), birth_date ))) AS age FROM users_cleaned)SELECT ROUND(AVG(stats_mean_score), 3) AS avg_score FROM tmp WHERE age >= ? AND age <= ?";
  req.con.query(sql,[Number(req.query.first),Number(req.query.second)],function(err,rows){
    res.render('search/s6',{rows:rows});
    return;
  });
});
router.get('/s7',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.score)){
    console.log('illegal data');
    req.session.errorType=9;
    res.redirect("/#s7");
    return;
  }
  var sql="SELECT high_score.title_japanese,high_score.anime_score,high_score.user_age FROM(SELECT animelist.title_japanese,AVG(animelist_clean.my_score) anime_score,AVG(users.age) user_age FROM(SELECT anime_id,username,my_score FROM animelist_cleaned WHERE my_score > 0) animelist_clean LEFT OUTER JOIN (SELECT anime_id,title_japanese,score FROM AnimeList9) animelist ON animelist_clean.anime_id = animelist.anime_id LEFT OUTER JOIN (SELECT username,TIMESTAMPDIFF(YEAR,birth_date,NOW()) age FROM users_cleaned) users ON users.username = animelist_clean.username WHERE animelist.score <= ? GROUP BY animelist_clean.anime_id) high_score ORDER BY high_score.anime_score DESC LIMIT 10";
  req.con.query(sql,Number(req.query.score),function(err,rows){
    res.render('search/s7',{rows:rows});
    return;
  });
});
router.get('/s8',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.first)||(!req.query.second)||(!req.query.name)){
    console.log('illegal data');
    req.session.errorType=10;
    res.redirect("/#s8");
    return;
  }
  var sql="SELECT AVG(animelist_specific.my_score) avg_score,AVG(users.age) avg_age FROM ((SELECT username,TIMESTAMPDIFF(YEAR,birth_date,NOW()) age FROM users_cleaned WHERE TIMESTAMPDIFF(YEAR,birth_date,NOW()) >= ? AND TIMESTAMPDIFF(YEAR,birth_date,NOW()) <= ?) users LEFT OUTER JOIN(SELECT username,anime_id,my_score FROM animelist_cleaned WHERE my_score > 0) animelist_specific ON users.username = animelist_specific.username LEFT OUTER JOIN (SELECT MAL_ID anime_id,Name FROM anime WHERE Name LIKE ?) one_anime ON one_anime.anime_id = animelist_specific.anime_id)";
  req.con.query(sql,[Number(req.query.first),Number(req.query.second),req.query.name],function(err,rows){
    res.render('search/s8',{rows:rows,anime:req.query.name});
    return;
  });
});
router.get('/s9',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.episode)){
    console.log('illegal data');
    req.session.errorType=11;
    res.redirect("/#s9");
    return;
  }
  var sql="WITH tmp AS (SELECT MAL_ID, NAME, Score, Episodes, ROW_NUMBER() OVER (PARTITION BY episodes ORDER BY score DESC) row_num FROM anime)SELECT NAME, Score FROM tmp WHERE row_num <= 100 AND Episodes = ? ORDER BY Score DESC";
  req.con.query(sql,Number(req.query.episode),function(err,rows){
    res.render('search/s9',{rows:rows,episode:req.query.episode});
    return;
  });
});
router.get('/s10',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  var sql="SELECT \"季番\" AS TYPE, ROUND(AVG(Score), 3) AS avg_score FROM anime WHERE Episodes >= 10 AND Episodes <= 14 UNION SELECT \"半年番\" AS TYPE, ROUND(AVG(Score), 3) AS avg_score FROM anime WHERE Episodes >= 20 AND Episodes <= 28 UNION SELECT \"年番\" AS TYPE, ROUND(AVG(Score), 3) AS avg_score FROM anime WHERE Episodes >= 50 AND Episodes <= 64";
  req.con.query(sql,Number(req.query.episode),function(err,rows){
    res.render('search/s10',{rows:rows});
    return;
  });
});
router.get('/s11',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.years)){
    console.log('illegal data');
    req.session.errorType=13;
    res.redirect("/#s11");
    return;
  }
  var sql="SELECT title_japanese name,score FROM AnimeList9 WHERE premiered LIKE ? ORDER BY score DESC LIMIT 10";
  req.con.query(sql,"%"+req.query.years+"%",function(err,rows){
    res.render('search/s11',{rows:rows,years:req.query.years});
    return;
  });
});
router.get('/s12',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  var sql="SELECT AVG(score) score FROM AnimeList9 WHERE premiered LIKE \"%201%\" ORDER BY score DESC";
  req.con.query(sql,function(err,newA){
    var sql="SELECT AVG(score) score FROM AnimeList9 WHERE premiered LIKE \"%200%\" OR \"%199\" ORDER BY score DESC";
    req.con.query(sql,function(err,oldA){
      res.render('search/s12',{newA:newA,oldA:oldA});
      return;
    });
  });
});
router.get('/s13',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.year)||(!req.query.season)){
    console.log('illegal data');
    req.session.errorType=15;
    res.redirect("/#s13");
    return;
  }
  var month=[["Jan%","Feb%","Mar%"],["Apr%","May%","Jun%"],["Jul%","Aug%","Sep%"],["Oct%","Nov%","Dec%"]];
  var season=["Spring","Summer","Autumn","Winter"];
  var sql="SELECT Japanese_name name,Score FROM anime WHERE Aired LIKE ? AND (Aired LIKE ? OR Aired LIKE ? OR Aired LIKE ?)ORDER BY Score DESC LIMIT 10";
  req.con.query(sql,["%"+req.query.year+"%",month[req.query.season][0],month[req.query.season][1],month[req.query.season][2]],function(err,rows){
    res.render('search/s13',{rows:rows,year:req.query.year,season:season[req.query.season]});
    return;
  });
});
router.get('/s14',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  var sql="SELECT Studios, ROUND(AVG(Score), 3) AS avg_score FROM anime GROUP BY Studios ORDER BY avg_score DESC LIMIT 100";
  req.con.query(sql,function(err,rows){
    res.render('search/s14',{rows:rows});
    return;
  });
});
router.get('/s15',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.name)){
    console.log('illegal data');
    req.session.errorType=17;
    res.redirect("/#s15");
    return;
  }
  var sql="SELECT title_japanese name,Score FROM AnimeList9 WHERE opening_theme LIKE ? OR ending_theme LIKE ? ORDER BY Score DESC";
  req.con.query(sql,["%"+req.query.name+"%","%"+req.query.name+"%"],function(err,rows){
    res.render('search/s15',{rows:rows,name:req.query.name});
    return;
  });
});
router.get('/s16',function(req, res, next){
  if(!req.session.signIned){
    var errorType=req.session.errorType;
    req.session.errorType=-1;
    res.render('index_unSignIn',{errorType:errorType});
    return;
  }
  //illegal data
  if((!req.query.x)){
    console.log('illegal data');
    req.session.errorType=18;
    res.redirect("/#s16");
    return;
  }
  var sql="SELECT titleh, ROUND(ABS(avg_hscore - avg_lscore),4) diff,avg_hscore,avg_lscore FROM((SELECT anime_h.title titleh,anime_h.anime_id,AVG(animelist_h.my_score) avg_hscore, COUNT(*) cnth FROM ((SELECT username,stats_mean_score FROM UserList9 WHERE stats_mean_score >= 8) high_user LEFT OUTER JOIN (SELECT username,anime_id,my_score FROM animelist_cleaned WHERE my_score > 0) animelist_h ON animelist_h.username = high_user.username LEFT OUTER JOIN(SELECT MAL_ID anime_id,Japanese_name title FROM anime) anime_h ON anime_h.anime_id = animelist_h.anime_id)GROUP BY anime_h.anime_id HAVING cnth >= 1000) high LEFT OUTER JOIN(SELECT anime_l.title titlel,anime_l.anime_id,AVG(animelist_l.my_score) avg_lscore, COUNT(*) cntl FROM ((SELECT username,stats_mean_score FROM UserList9 WHERE stats_mean_score <= 3 AND stats_mean_score > 0) low_user LEFT OUTER JOIN (SELECT username,anime_id,my_score FROM animelist_cleaned WHERE my_score > 0) animelist_l ON animelist_l.username = low_user.username LEFT OUTER JOIN(SELECT MAL_ID anime_id,Japanese_name title FROM anime) anime_l ON anime_l.anime_id = animelist_l.anime_id)GROUP BY anime_l.anime_id HAVING cntl >= 1000) low ON high.anime_id = low.anime_id)WHERE ABS(avg_hscore - avg_lscore) >= ? ORDER BY diff DESC LIMIT 10";
  req.con.query(sql,Number(req.query.x),function(err,rows){
    res.render('search/s16',{rows:rows});
    return;
  });
});
module.exports = router;
